import { listBlogCategories } from "@/lib/services/blog";
import { BlogPostForm } from "@/components/dashboard/forms/blog-post-form";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  const categories = await listBlogCategories({ pageSize: 100 });

  return (
    <BlogPostForm
      categories={categories.items.map((c) => ({ value: c.id, label: c.name }))}
    />
  );
}
