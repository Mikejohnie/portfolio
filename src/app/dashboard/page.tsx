//admin dashboard page

"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";
import { LogOut } from "lucide-react";

const page = () => {
  const logout = useLogout();
  return (
    <div className="mx-auto max-w-5xl px-6 min-h-screen">
      hello welcome
      <Button
        variant={"secondary"}
        className="w-full flex gap-2 text-red-500 "
        onClick={logout}
      >
        <LogOut className="w-4 h-4" /> Logout
      </Button>
    </div>
  );
};

export default page;
