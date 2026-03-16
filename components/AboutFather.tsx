import FadeInSection from './FadeInSection'

function PawsIcon() {
  return (
    <svg
      viewBox="0 0 180 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-44 h-36"
      aria-hidden="true"
    >
      {/* Patte grande — centre bas */}
      <g fill="#8B7355" opacity="1">
        <ellipse cx="90" cy="108" rx="14" ry="11" />
        <ellipse cx="72" cy="90" rx="7.5" ry="9" />
        <ellipse cx="84" cy="84" rx="7.5" ry="9" />
        <ellipse cx="97" cy="84" rx="7.5" ry="9" />
        <ellipse cx="109" cy="90" rx="7.5" ry="9" />
      </g>
      {/* Patte moyenne — haut gauche */}
      <g fill="#8B7355" opacity="0.55">
        <ellipse cx="38" cy="72" rx="10" ry="8" />
        <ellipse cx="25" cy="58" rx="5.5" ry="6.5" />
        <ellipse cx="35" cy="52" rx="5.5" ry="6.5" />
        <ellipse cx="46" cy="52" rx="5.5" ry="6.5" />
        <ellipse cx="55" cy="58" rx="5.5" ry="6.5" />
      </g>
      {/* Patte petite — haut droit */}
      <g fill="#8B7355" opacity="0.32">
        <ellipse cx="145" cy="55" rx="8" ry="6.5" />
        <ellipse cx="134" cy="43" rx="4.5" ry="5.5" />
        <ellipse cx="143" cy="38" rx="4.5" ry="5.5" />
        <ellipse cx="152" cy="38" rx="4.5" ry="5.5" />
        <ellipse cx="160" cy="43" rx="4.5" ry="5.5" />
      </g>
    </svg>
  )
}

export default function AboutFather() {
  return (
    <section id="papa" className="bg-bg-alt py-24 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">

        <FadeInSection>
          <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3">Le papa</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-6">Moshe</h2>
          <div className="w-12 h-px bg-accent mb-8" />
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-16 items-center">

          <FadeInSection delay={0.1}>
            <div className="flex items-center justify-center h-64 rounded-2xl bg-bg border border-text/5">
              <div className="text-center">
                <PawsIcon />
                <p className="font-sans text-sm text-text/40 mt-4 tracking-wide">Photo à venir</p>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="space-y-4 font-sans text-text/80 leading-relaxed">
              <p>
                Moshe est un magnifique Border Collie noir, sélectionné pour son
                caractère équilibré et ses qualités sportives.
              </p>
              <p>
                L&apos;association de Prana (brun) et de Moshe (noir) promet des chiots
                aux robes variées, potentiellement brun tricolore, noir tricolore ou merle,
                tous porteurs de l&apos;intelligence et de l&apos;énergie propres à la race.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                'Moshe',
                'Caractère équilibré',
                'Race pure',
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

        </div>
      </div>
    </section>
  )
}
