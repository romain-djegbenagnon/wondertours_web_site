import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { BlogDetail } from "@/components/blog/blog-detail";
import { BLOG_POSTS } from "@/lib/data/blog";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <BlogDetail 
          post={post} 
          relatedPosts={BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3)}
        />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
