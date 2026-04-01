import { Recycle } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mx-auto mb-4 animate-pulse">
          <Recycle className="h-6 w-6 text-primary" />
        </div>
        <div className="flex items-center gap-1 justify-center">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="text-sm text-muted-foreground mt-3">Loading...</p>
      </div>
    </div>
  );
}
