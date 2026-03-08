import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select("id, title, slug, content, image_url, created_at")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <article className="container py-12">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/blog">← Back to blog</Link>
      </Button>
      <header className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {post.title}
        </h1>
        <time
          dateTime={post.created_at}
          className="mt-2 block text-muted-foreground"
        >
          {new Date(post.created_at).toLocaleDateString()}
        </time>
      </header>
      {post.image_url && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={post.image_url}
            alt=""
            fill
            unoptimized
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
      )}
      <div className="blog-content mt-8 space-y-4 text-foreground [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:leading-7 [&_ul]:list-inside [&_ul]:list-disc [&_ol]:list-inside [&_ol]:list-decimal [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-4">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
