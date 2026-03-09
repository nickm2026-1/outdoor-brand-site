"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const POSTS_BUCKET = "post-images";

export async function updatePost(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image_url = (formData.get("image_url") as string) || null;
  const image = formData.get("image") as File | null;

  if (!title?.trim() || !content?.trim()) {
    redirect(
      `/admin/posts/${id}/edit?error=` +
        encodeURIComponent("Title and content are required.")
    );
  }

  const supabase = await createClient();

  let finalImageUrl: string | null = image_url?.trim() || null;
  if (image && image.size > 0) {
    const ext = image.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = ext.replace(/[^a-z0-9]/g, "") || "jpg";
    const filePath = `posts/${id}/${crypto.randomUUID()}.${safeExt}`;

    const arrayBuffer = await image.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(POSTS_BUCKET)
      .upload(filePath, Buffer.from(arrayBuffer), {
        contentType: image.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      redirect(
        `/admin/posts/${id}/edit?error=` +
          encodeURIComponent(uploadError.message)
      );
    }

    const { data } = supabase.storage.from(POSTS_BUCKET).getPublicUrl(filePath);
    finalImageUrl = data.publicUrl;
  }

  const { error } = await supabase
    .from("posts")
    .update({
      title: title.trim(),
      content: content.trim(),
      image_url: finalImageUrl,
    })
    .eq("id", id);

  if (error) {
    redirect(
      `/admin/posts/${id}/edit?error=` + encodeURIComponent(error.message)
    );
  }
  redirect("/admin/posts");
}
