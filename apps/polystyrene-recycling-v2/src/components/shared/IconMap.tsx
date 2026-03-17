"use client";

import { LucideProps } from "lucide-react";
import * as Icons from "lucide-react";

interface IconMapProps extends LucideProps {
  name: string;
}

export function IconMap({ name, ...props }: IconMapProps) {
  const LucideIcon = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];

  if (!LucideIcon) {
    return <Icons.HelpCircle {...props} />;
  }

  return <LucideIcon {...props} />;
}
