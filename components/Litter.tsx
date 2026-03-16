import FadeInSection from './FadeInSection'

const facts = [
  {
    icon: '🧠',
    title: 'Intelligence exceptionnelle',
    desc: 'Le Border Collie est souvent classé première race la plus intelligente au monde. Il apprend des ordres en quelques répétitions.',
  },
  {
    icon: '⚡',
    title: 'Énergie & sport',
    desc: "Race de berger à l'origine, le Border Collie a besoin d'au moins 2h d'activité par jour. Idéal pour les familles actives.",
  },
  {
    icon: '❤️',
    title: 'Fidélité & affection',
    desc: "Très attaché à sa famille, le Border Collie est doux, loyal et excellent avec les enfants lorsqu'il est bien socialisé.",
  },
  {
    icon: '🎨',
    title: 'Robes possibles',
    desc: "L'union de Prana (brun) et du papa (noir) peut donner des chiots brun tricolore ou noir tricolore, aux yeux souvent clairs.",
  },
]

export default function Litter() {
  return (
    <section id="portee" className="bg-bg py-24 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">

        <FadeInSection>
          <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3">La portée</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-3">Printemps 2026</h2>
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-sans font-semibold text-white bg-accent rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
              Portée imminente
            </span>
          </div>
          <div className="w-12 h-px bg-accent mb-12" />
        </FadeInSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, i) => (
            <FadeInSection key={fact.title} delay={i * 0.1}>
              <div className="bg-bg-alt rounded-2xl p-6 h-full">
                <span className="text-2xl mb-4 block">{fact.icon}</span>
                <h3 className="font-serif text-lg font-bold text-text mb-2">{fact.title}</h3>
                <p className="font-sans text-sm text-text/70 leading-relaxed">{fact.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>

      </div>
    </section>
  )
}
