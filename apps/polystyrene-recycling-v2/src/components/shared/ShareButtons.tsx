"use client";

import { useState } from "react";
import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary"
          asChild
        >
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="h-4 w-4" />
          </a>
        </Button>
      ))}
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary"
        onClick={copyToClipboard}
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
