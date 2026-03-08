import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
      <h1 className="text-2xl font-bold text-foreground">Post not found</h1>
      <p className="mt-2 text-muted-foreground">
        This post may have been removed or the link is incorrect.
      </p>
      <Button className="mt-6" asChild>
        <Link href="/blog">Back to blog</Link>
      </Button>
    </div>
  );
}
