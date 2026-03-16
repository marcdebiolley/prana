import FadeInSection from './FadeInSection'

function BorderCollieIcon() {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-40 h-32 opacity-30"
      aria-hidden="true"
    >
      <path
        d="M160 80 C165 60, 175 50, 170 40 C165 30, 155 35, 150 45
           C145 35, 135 30, 125 40 C120 50, 122 60, 118 70
           C110 65, 95 60, 80 65 C65 70, 50 80, 40 95
           C30 110, 35 125, 45 130 C55 135, 60 125, 65 115
           C70 105, 75 100, 80 100 C90 100, 95 110, 100 120
           C105 130, 115 135, 125 130 C135 125, 130 115, 128 105
           C135 100, 145 95, 155 90 C165 85, 168 82, 160 80Z"
        fill="#8B7355"
      />
      <path
        d="M155 90 C165 85, 180 75, 190 60 C185 58, 178 65, 168 72 C162 77, 158 83, 155 90Z"
        fill="#8B7355"
      />
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
                <BorderCollieIcon />
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
