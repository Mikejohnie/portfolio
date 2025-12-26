import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  ADMIN_LOGIN_REDIRECT,
  dashboardPrefix,
} from "./routes";

const { auth: Middleware } = NextAuth(authConfig);
export default Middleware((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isLoggedIn = !!req.auth;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isDashboardRoute = pathname.startsWith(dashboardPrefix);

  console.log("Middleware isLoggedIn:", !!req.auth);

  // --- DEBUG LOGGING ---
  if (process.env.NODE_ENV === "development") {
    console.log("\n🔍 Middleware Debug Info:");
    console.log("➡️ Path:", pathname);
    console.log("👤 Logged In:", isLoggedIn);
    console.log("🌐 isPublicRoute:", isPublicRoute);
    console.log("🔐 isAuthRoute:", isAuthRoute);
    console.log("🧩 isApiAuthRoute:", isApiAuthRoute);
    console.log("---------------------------");
  }

  // ✅ Skip all /api/auth/* routes
  if (isApiAuthRoute) {
    console.log("⏭ Skipping API Auth route\n");
    return;
  }

  // ✅ If user is logged in and visits /login or /register → redirect to dashboard
  if (isAuthRoute && isLoggedIn) {
    console.log("🔁 Redirecting logged-in user away from auth route\n");
    return Response.redirect(new URL(ADMIN_LOGIN_REDIRECT, nextUrl));
  }

  if (isDashboardRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  if (isPublicRoute) {
    return;
  }

  console.log("✅ Access allowed\n");
  return;
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next|favicon.ico|public).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
