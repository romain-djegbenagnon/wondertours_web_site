"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  videoCta?: { text: string; href: string };
  image: string;
  overlay?: boolean;
}

export function Hero({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  videoCta,
  image,
  overlay = true,
}: HeroProps) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4 text-xs font-medium uppercase tracking-wider text-secondary"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-heading text-3xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {primaryCta && (
              <Button variant="primary" size="lg" href={primaryCta.href}>
                {primaryCta.text}
              </Button>
            )}
            {secondaryCta && (
              <Button variant="outline" size="lg" href={secondaryCta.href} className="border-white text-white hover:bg-white hover:text-text">
                {secondaryCta.text}
              </Button>
            )}
          </motion.div>

          {videoCta && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8"
            >
              <a
                href={videoCta.href}
                className="inline-flex items-center space-x-2 text-white hover:text-secondary transition-colors"
              >
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:border-secondary transition-colors">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span className="font-medium">{videoCta.text}</span>
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
