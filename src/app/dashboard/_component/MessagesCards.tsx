"use client";

import { Button } from "@/components/ui/button";
import { markMessageRead, deleteMessage } from "@/actions/messageActions";
import { MailOpen, Trash, Reply, Clock, Loader } from "lucide-react";
import { MessageUI } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  messages: MessageUI[];
  onSelect: (msg: MessageUI) => void;
  selectedId?: string;
};

export default function MessagesCard({
  messages,
  onSelect,
  selectedId,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          onClick={() => onSelect(msg)}
          key={msg.id}
          className={`rounded-xl border p-4 space-y-3 cursor-pointer transition hover:bg-muted   ${
            msg.id === selectedId ? "bg-muted" : ""
          } ${!msg.read ? "bg-blue-500/5 border-blue-500/20" : ""}`}
        >
          {/* HEADER */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium">{msg.name}</p>
              <p className="text-xs text-muted-foreground">{msg.email}</p>
            </div>

            {!msg.read && (
              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs text-blue-600">
                New
              </span>
            )}
          </div>

          {/* MESSAGE */}
          <p className="text-sm text-muted-foreground line-clamp-3">
            {msg.message}
          </p>

          {/* FOOTER */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {msg.formattedDate}
            </div>

            <div className="flex gap-2">
              {!msg.read && (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => markMessageRead(msg.id)}
                >
                  <MailOpen className="h-4 w-4" />
                </Button>
              )}

              <Button size="icon" variant="outline" asChild>
                <a
                  href={`mailto:${msg.email}?subject=Re: Your inquiry&body=Hi ${msg.name},`}
                >
                  <Reply className="h-4 w-4" />
                </a>
              </Button>

              <Button
                size="icon"
                variant="destructive"
                disabled={isLoading}
                onClick={() => {
                  deleteMessage(msg.id), setIsLoading(true);
                  toast.success("Message deleted successfully!");
                }}
              >
                {isLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {messages.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          No messages yet
        </p>
      )}
    </div>
  );
}
