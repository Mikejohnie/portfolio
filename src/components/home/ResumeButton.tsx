import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type Props = {
  resumeUrl?: string;
};

export default function ResumeButton({ resumeUrl }: Props) {
  if (!resumeUrl) return null;

  return (
    <Button asChild size="lg" variant="outline">
      <Link href={resumeUrl} target="_blank" rel="noreferrer">
        <Download className="mr-2 h-4 w-4" />
        Download Resume
      </Link>
    </Button>
  );
}
