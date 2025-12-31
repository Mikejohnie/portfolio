import { getPublicAbout } from "@/components/helper/getPublicAbout";
import CreateAboutForm from "../_component/CreateAboutForm";

export default async function Page() {
  const about = await getPublicAbout();

  return <div>{about ? "Edit About" : <CreateAboutForm />}</div>;
}
