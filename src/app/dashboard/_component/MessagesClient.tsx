"use client";

import { useState } from "react";
import MessagesCard from "./MessagesCards";
import MessagesDataTable from "./MessagesDataTable";
import MessagePreviewModal from "./MessagePreviewModal";
import { MessageUI } from "@/lib/types";

type Props = {
  messages: MessageUI[];
};

export default function MessagesClient({ messages }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageUI | null>(
    null
  );

  const handleSelectMessage = (message: MessageUI) => {
    setSelectedMessage(message);
    setOpen(true);
  };

  if (messages.length === 0) {
    return <p className="text-muted-foreground text-sm">No messages yet.</p>;
  }

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:block">
        <MessagesDataTable
          messages={messages}
          onRowClick={handleSelectMessage}
          selectedId={selectedMessage?.id}
        />
      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        <MessagesCard
          messages={messages}
          onSelect={handleSelectMessage}
          selectedId={selectedMessage?.id}
        />
      </div>

      {/* PREVIEW MODAL */}
      <MessagePreviewModal
        open={open}
        onOpenChange={setOpen}
        message={selectedMessage}
      />
    </>
  );
}
