"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardImage, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/lib/data/blog";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="h-full group cursor-pointer">
          <CardImage src={post.image} alt={post.title} />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center text-text-secondary text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
            </div>
            
            <h3 className="font-heading text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            
            <p className="text-text-secondary mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            
            <div className="flex items-center text-text-secondary text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
