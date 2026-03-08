"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || null;
  const affiliate_link = (formData.get("affiliate_link") as string) || null;
  const image_url = (formData.get("image_url") as string) || null;
  const category = (formData.get("category") as string) || null;
  if (!name?.trim()) {
    redirect("/admin/products/new?error=" + encodeURIComponent("Name is required."));
  }
  const supabase = await createClient();
  const { error } = await supabase.from("products").insert({
    name: name.trim(),
    description: description?.trim() || null,
    affiliate_link: affiliate_link?.trim() || null,
    image_url: image_url?.trim() || null,
    category: category?.trim() || null,
  });
  if (error) {
    redirect("/admin/products/new?error=" + encodeURIComponent(error.message));
  }
  redirect("/admin");
}
