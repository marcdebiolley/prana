import FadeInSection from './FadeInSection'

const criteria = [
  { label: 'Famille active', desc: 'Vous pratiquez sport, randonnée ou avez un mode de vie dynamique.' },
  { label: 'Espace extérieur', desc: "Jardin ou accès facile à des espaces verts pour les promenades quotidiennes." },
  { label: 'Disponibilité', desc: "Vous pouvez consacrer du temps et de l'attention à votre chien au quotidien." },
  { label: 'Engagement long terme', desc: "Vous êtes prêt(e) à vous engager pour les 12 à 15 ans de vie de votre Border Collie." },
  { label: 'Stimulation mentale', desc: "Vous souhaitez pratiquer un sport canin, de l'agility ou du training régulier." },
]

export default function AdoptionInfo() {
  return (
    <section id="adoption" className="bg-bg-alt py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <FadeInSection>
          <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3">Adoption</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-6">Ce que nous recherchons</h2>
          <div className="w-12 h-px bg-accent mb-12" />
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          <FadeInSection delay={0.1}>
            <ul className="space-y-5">
              {criteria.map((item) => (
                <li key={item.label} className="flex gap-4">
                  <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-full bg-accent/15 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                  </span>
                  <div>
                    <p className="font-sans font-medium text-text">{item.label}</p>
                    <p className="font-sans text-sm text-text/60 mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="bg-bg rounded-2xl p-8">
              <h3 className="font-serif text-xl font-bold text-text mb-4">Le processus</h3>
              <ol className="space-y-4">
                {[
                  'Soumettez votre candidature via le formulaire',
                  'Nous étudions votre dossier avec soin',
                  'Nous vous recontactons par email ou téléphone',
                  'Une rencontre avec Prana et les chiots est organisée',
                  'Remise du chiot accompagné de ses documents',
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-xs font-sans font-medium flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="font-sans text-sm text-text/70 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </FadeInSection>

        </div>
      </div>
    </section>
  )
}
