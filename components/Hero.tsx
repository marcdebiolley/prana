'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-end">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/prana-hero.jpg"
          alt="Prana, Border Collie brun"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 40%' }}
          sizes="100vw"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-block mb-4 px-3 py-1 text-xs font-sans font-medium tracking-widest uppercase text-white/90 border border-white/40 rounded-full"
          >
            Portée imminente
          </motion.span>

          {/* Title */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-3">
            Portée de Prana
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-lg md:text-xl text-white/80 tracking-wide">
            Border Collie · Printemps 2026
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator — hidden on mobile to avoid overlap */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="font-sans text-xs text-white/50 tracking-widest uppercase">Découvrir</span>
        <motion.div
          className="w-px h-8 bg-white/30"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
