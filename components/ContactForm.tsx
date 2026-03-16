'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeInSection from './FadeInSection'

interface FormData {
  nom: string
  email: string
  telephone: string
  logement: string
  jardin: string
  enfants: string
  animaux: string
  experience: string
  motivation: string
}

const initialForm: FormData = {
  nom: '',
  email: '',
  telephone: '',
  logement: '',
  jardin: '',
  enfants: '',
  animaux: '',
  experience: '',
  motivation: '',
}

function buildMailto(data: FormData): string {
  const subject = encodeURIComponent(`Candidature adoption — ${data.nom}`)
  const body = encodeURIComponent(
    `Prénom & Nom : ${data.nom}\n` +
    `Email : ${data.email}\n` +
    `Téléphone : ${data.telephone || 'Non renseigné'}\n` +
    `Logement : ${data.logement}\n` +
    `Jardin : ${data.jardin}\n` +
    `Enfants : ${data.enfants}\n` +
    `Autres animaux : ${data.animaux || 'Aucun'}\n` +
    `Expérience avec les chiens : ${data.experience}\n` +
    `\nMotivation :\n${data.motivation}`
  )
  return `mailto:marcdebiolley@gmail.com?cc=muriel.vanhavre@gmail.com&subject=${subject}&body=${body}`
}

function isValid(data: FormData): boolean {
  return !!(
    data.nom.trim() &&
    data.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) &&
    data.logement &&
    data.jardin &&
    data.enfants &&
    data.experience &&
    data.motivation.trim().length >= 100
  )
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-text/15 bg-white font-sans text-sm text-text placeholder:text-text/30 transition-colors duration-200 focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none'

const labelClass = 'block font-sans text-sm font-medium text-text/80 mb-2'

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm)

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const valid = isValid(form)

  return (
    <section id="contact" className="bg-bg py-24 px-6 scroll-mt-20">
      <div className="max-w-3xl mx-auto">

        <FadeInSection>
          <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3">Candidature</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-6">
            Soumettre ma candidature
          </h2>
          <div className="w-12 h-px bg-accent mb-12" />
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (valid) window.location.href = buildMailto(form)
            }}
            noValidate
            className="space-y-6"
          >
            {/* Nom */}
            <div>
              <label htmlFor="nom" className={labelClass}>Prénom &amp; Nom *</label>
              <input id="nom" type="text" required value={form.nom} onChange={set('nom')} className={inputClass} placeholder="Marie Dupont" />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>Email *</label>
              <input id="email" type="email" required value={form.email} onChange={set('email')} className={inputClass} placeholder="marie@exemple.com" />
            </div>

            {/* Téléphone */}
            <div>
              <label htmlFor="telephone" className={labelClass}>Téléphone <span className="text-text/40 font-normal">(optionnel)</span></label>
              <input id="telephone" type="tel" value={form.telephone} onChange={set('telephone')} className={inputClass} placeholder="06 00 00 00 00" />
            </div>

            {/* Logement */}
            <div>
              <label htmlFor="logement" className={labelClass}>Type de logement *</label>
              <select id="logement" required value={form.logement} onChange={set('logement')} className={inputClass}>
                <option value="">Sélectionner...</option>
                <option value="Maison">Maison</option>
                <option value="Appartement">Appartement</option>
                <option value="Ferme / propriété">Ferme / propriété</option>
              </select>
            </div>

            {/* Jardin */}
            <fieldset>
              <legend className={labelClass}>Jardin ou espace extérieur privatif ? *</legend>
              <div className="flex gap-4">
                {['Oui', 'Non'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 font-sans text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="jardin"
                      value={opt}
                      checked={form.jardin === opt}
                      onChange={set('jardin')}
                      className="accent-accent"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Enfants */}
            <fieldset>
              <legend className={labelClass}>Enfants à la maison ? *</legend>
              <div className="flex gap-4">
                {['Oui', 'Non'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 font-sans text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="enfants"
                      value={opt}
                      checked={form.enfants === opt}
                      onChange={set('enfants')}
                      className="accent-accent"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Autres animaux */}
            <div>
              <label htmlFor="animaux" className={labelClass}>Autres animaux <span className="text-text/40 font-normal">(optionnel)</span></label>
              <input id="animaux" type="text" value={form.animaux} onChange={set('animaux')} className={inputClass} placeholder="Ex : un chat, un autre chien..." />
            </div>

            {/* Expérience */}
            <fieldset>
              <legend className={labelClass}>Expérience avec les chiens *</legend>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'Débutant', label: "Débutant, premier chien" },
                  { value: 'Expérimenté', label: "Expérimenté, j'ai déjà eu des chiens" },
                  { value: 'Border Collie', label: "J'ai déjà eu un Border Collie" },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 font-sans text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="experience"
                      value={opt.value}
                      checked={form.experience === opt.value}
                      onChange={set('experience')}
                      className="accent-accent"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Motivation */}
            <div>
              <label htmlFor="motivation" className={labelClass}>
                Votre motivation *
                <span className="ml-2 text-text/40 font-normal">
                  ({form.motivation.length}/100 caractères minimum)
                </span>
              </label>
              <textarea
                id="motivation"
                required
                rows={6}
                value={form.motivation}
                onChange={set('motivation')}
                className={inputClass}
                placeholder="Pourquoi souhaitez-vous adopter un chiot de Prana ? Décrivez votre mode de vie, vos projets avec votre futur Border Collie..."
              />
            </div>

            {/* Submit */}
            <div>
              <motion.button
                type="submit"
                disabled={!valid}
                whileTap={valid ? { scale: 0.97 } : {}}
                className={`w-full py-4 rounded-xl font-sans font-medium text-sm tracking-wide transition-all duration-200 ${
                  valid
                    ? 'bg-accent text-white hover:bg-accent-hover cursor-pointer'
                    : 'bg-text/10 text-text/30 cursor-not-allowed'
                }`}
              >
                Envoyer ma candidature
              </motion.button>

              {/* Mobile fallback */}
              <p className="mt-3 text-center font-sans text-xs text-text/40">
                Si le lien ne s&apos;ouvre pas,{' '}
                <a
                  href="mailto:marcdebiolley@gmail.com"
                  className="text-accent hover:text-accent-hover underline underline-offset-2"
                >
                  envoyez directement un email
                </a>
              </p>
            </div>

            {/* GDPR */}
            <p className="font-sans text-xs text-text/40 text-center leading-relaxed border-t border-text/10 pt-4">
              Vos informations sont utilisées uniquement pour traiter votre candidature
              et ne sont pas conservées au-delà de cette démarche.
            </p>

          </form>
        </FadeInSection>
      </div>
    </section>
  )
}
