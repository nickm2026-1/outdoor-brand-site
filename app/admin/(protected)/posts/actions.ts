"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deletePost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    redirect("/admin/posts?error=" + encodeURIComponent(error.message));
  }
  redirect("/admin/posts");
}
