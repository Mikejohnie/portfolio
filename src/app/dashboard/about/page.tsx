import { getAbout } from "@/actions/aboutActions";
import AboutForm from "../_component/AboutForm";

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">About Settings</h1>
      <AboutForm about={about} />
    </div>
  );
}
