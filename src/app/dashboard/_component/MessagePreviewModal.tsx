"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash, Reply, Clock } from "lucide-react";
import { MessageUI } from "@/lib/types";
import { markMessageRead, deleteMessage } from "@/actions/messageActions";
import { useEffect, useTransition } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: MessageUI | null;
};

export default function MessagePreviewModal({
  open,
  onOpenChange,
  message,
}: Props) {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (open && message && !message.read) {
      startTransition(() => {
        markMessageRead(message.id);
      });
    }
  }, [open, message]);

  if (!message) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        {/* HEADER */}
        <DialogHeader className="space-y-1">
          <DialogTitle className="flex items-center gap-2">
            {message.name}
            {!message.read && (
              <Badge className="bg-blue-500/10 text-blue-600">New</Badge>
            )}
          </DialogTitle>

          <DialogDescription className="flex flex-wrap items-center gap-2 text-sm">
            <span>{message.email}</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              {message.formattedDate}
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* MESSAGE BODY */}
        <div className="border rounded-lg p-4 text-sm leading-relaxed whitespace-pre-wrap">
          {message.message}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center pt-4">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <a
                href={`mailto:${message.email}?subject=Re: Your message&body=Hi ${message.name},`}
              >
                <Reply className="mr-2 h-4 w-4" />
                Reply
              </a>
            </Button>
          </div>

          <Button
            size="sm"
            variant="destructive"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                await deleteMessage(message.id);
                onOpenChange(false);
              })
            }
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
