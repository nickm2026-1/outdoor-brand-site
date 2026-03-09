"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const POSTS_BUCKET = "post-images";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image_url = (formData.get("image_url") as string) || null;
  const image = formData.get("image") as File | null;
  const tags = ((formData.get("tags") as string) || "")
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
  if (!title?.trim() || !content?.trim()) {
    redirect(
      "/admin/posts/new?error=" +
        encodeURIComponent("Title and content are required.")
    );
  }
  const slug = slugify(title);
  const supabase = await createClient();

  let finalImageUrl: string | null = image_url?.trim() || null;
  if (image && image.size > 0) {
    const ext = image.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = ext.replace(/[^a-z0-9]/g, "") || "jpg";
    const filePath = `posts/${slug}/${crypto.randomUUID()}.${safeExt}`;

    const arrayBuffer = await image.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(POSTS_BUCKET)
      .upload(filePath, Buffer.from(arrayBuffer), {
        contentType: image.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      redirect("/admin/posts/new?error=" + encodeURIComponent(uploadError.message));
    }

    const { data } = supabase.storage.from(POSTS_BUCKET).getPublicUrl(filePath);
    finalImageUrl = data.publicUrl;
  }

  const { error } = await supabase.from("posts").insert({
    title: title.trim(),
    slug,
    content: content.trim(),
    image_url: finalImageUrl,
    tags,
  });
  if (error) {
    redirect("/admin/posts/new?error=" + encodeURIComponent(error.message));
  }
  redirect("/admin");
}
