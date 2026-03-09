"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function updateDestination(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const location = (formData.get("location") as string) || null;
  const description = (formData.get("description") as string) || null;
  const image_url = (formData.get("image_url") as string) || null;

  if (!name?.trim()) {
    redirect(
      `/admin/destinations/${id}/edit?error=` +
        encodeURIComponent("Destination name is required.")
    );
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("destinations")
    .update({
      name: name.trim(),
      location: location?.trim() ?? null,
      description: description?.trim() ?? null,
      image_url: image_url?.trim() ?? null,
    })
    .eq("id", id);

  if (error) {
    redirect(
      `/admin/destinations/${id}/edit?error=` +
        encodeURIComponent(error.message)
    );
  }
  redirect("/admin/destinations");
}
