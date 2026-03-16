'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import FadeInSection from './FadeInSection'

const photos = [
  { src: '/images/prana-1.jpg', alt: 'Prana dans la nature' },
  { src: '/images/prana-2.jpg', alt: 'Portrait de Prana' },
  { src: '/images/prana-3.jpg', alt: 'Prana en promenade' },
]

export default function AboutPrana() {
  return (
    <section id="prana" className="bg-bg py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <FadeInSection>
          <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3">La maman</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-6">Prana</h2>
          <div className="w-12 h-px bg-accent mb-8" />
        </FadeInSection>

        {/* Text + gallery layout */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Description */}
          <FadeInSection delay={0.1}>
            <div className="space-y-4 font-sans text-text/80 leading-relaxed">
              <p>
                Prana est une Border Collie brun tricolore de 6 ans, pleine de vie, d&apos;intelligence
                et d&apos;affection. Son nom, emprunté au Sanskrit, signifie <em>«&nbsp;souffle vital&nbsp;»</em> —
                et elle porte ce nom à merveille.
              </p>
              <p>
                Douce avec les enfants, curieuse et équilibrée, Prana est une chienne de famille
                exceptionnelle. Elle allie l&apos;énergie caractéristique des Border Collies à un
                tempérament calme et attentif à son foyer.
              </p>
              <p>
                À 6 ans, c&apos;est sa première portée. Chaque chiot sera élevé dans un environnement
                familial chaleureux, socialisé dès les premiers jours.
              </p>
            </div>

            {/* Info chips */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                '6 ans',
                'Border Collie brun',
                'Première portée',
                'Élevage familial',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-sans font-medium text-accent border border-accent/30 rounded-full bg-accent/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeInSection>

          {/* Photo gallery */}
          <FadeInSection delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              {/* Large photo */}
              <motion.div
                className="col-span-2 relative aspect-[4/3] rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={photos[0].src}
                  alt={photos[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Small photos */}
              {photos.slice(1).map((photo) => (
                <motion.div
                  key={photo.src}
                  className="relative aspect-square rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>
              ))}
            </div>
          </FadeInSection>

        </div>
      </div>
    </section>
  )
}
