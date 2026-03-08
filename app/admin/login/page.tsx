import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminLoginForm } from "./AdminLoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { next } = await searchParams;
    redirect(next ?? "/admin");
  }

  return (
    <div className="container flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-sm space-y-8 rounded-lg border border-border bg-card p-8 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Use your account to manage content.
          </p>
        </div>
        <AdminLoginForm next={(await searchParams).next} />
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
