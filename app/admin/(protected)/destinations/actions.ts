"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deleteDestination(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("destinations")
    .delete()
    .eq("id", id);
  if (error) {
    redirect("/admin/destinations?error=" + encodeURIComponent(error.message));
  }
  redirect("/admin/destinations");
}
