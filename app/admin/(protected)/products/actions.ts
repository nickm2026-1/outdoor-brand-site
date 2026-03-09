"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    redirect("/admin/products?error=" + encodeURIComponent(error.message));
  }
  redirect("/admin/products");
}
