"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardImage, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/lib/data/blog";
import { useLanguage } from "@/contexts/language-context";
import { BlogDetailModal } from "./blog-detail-modal";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { locale } = useLanguage();
  const isFr = locale === "fr";

  // Champs FR avec repli automatique sur la traduction EN quand la
  // colonne En n'est pas renseignée en base.
  const title = isFr ? post.title : post.titleEn || post.title;
  const category = isFr ? post.category : post.categoryEn || post.category;
  const excerpt = isFr ? post.excerpt : post.excerptEn || post.excerpt;
  const readTime = isFr ? post.readTime : post.readTimeEn || post.readTime;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8 }}
      >
        <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
          <Card className="h-full group">
            <CardImage src={post.image} alt={title} />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary">{category}</Badge>
                <div className="flex items-center text-text-secondary text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {readTime}
                </div>
              </div>

              <h3 className="font-heading text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                {title}
              </h3>

              <p className="text-text-secondary mb-4 line-clamp-2">
                {excerpt}
              </p>

              <div className="flex items-center text-text-secondary text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.date).toLocaleDateString(
                  locale === "fr" ? "fr-FR" : "en-US",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <BlogDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={post}
      />
    </>
  );
}
