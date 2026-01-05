import { getAdminMessages } from "@/components/helper/getAdminMessages";
import MessagesClient from "../_component/MessagesClient";

export default async function MessagesPage() {
  const rawMessages = await getAdminMessages();

  const messages = rawMessages.map((m) => ({
    ...m,
    formattedDate: new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(m.createdAt)),
  }));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Hire Requests</h1>
        <p className="text-muted-foreground">
          Messages from recruiters and clients
        </p>
      </header>

      <MessagesClient messages={messages} />
    </div>
  );
}
