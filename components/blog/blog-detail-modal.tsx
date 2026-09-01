"use client";

import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Share2 } from "lucide-react";
import { BlogPost } from "@/lib/data/blog";

interface BlogDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost;
}

export function BlogDetailModal({ isOpen, onClose, post }: BlogDetailModalProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="relative h-64 md:h-80">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Badge variant="secondary" className="mb-3">{post.category}</Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
            {post.title}
          </h2>
          <div className="flex flex-wrap gap-4 text-white text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="prose prose-lg max-w-none">
          <p className="text-text-secondary text-xl leading-relaxed mb-6">
            {post.excerpt}
          </p>
          <div className="text-text-secondary leading-relaxed">
            {post.content}
          </div>
        </div>

        {/* Share */}
        <div className="flex items-center gap-4 mt-12 pt-8 border-t">
          <span className="text-text font-medium">Partager :</span>
          <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
            <Share2 className="w-5 h-5" />
            Copier le lien
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="font-heading text-xl font-bold text-text mb-6">
            Laisser un commentaire
          </h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-text mb-2">
                Commentaire
              </label>
              <textarea
                id="comment"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
                placeholder="Votre commentaire..."
              />
            </div>
            <Button variant="primary" type="submit">
              Envoyer le commentaire
            </Button>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
