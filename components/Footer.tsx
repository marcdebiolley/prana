export default function Footer() {
  return (
    <footer className="bg-footer py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* Brand */}
          <div>
            <p className="font-serif text-xl font-bold text-white/90">Portée de Prana</p>
            <p className="font-sans text-xs text-white/30 mt-1 tracking-wide">Élevage particulier</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1">
            <a
              href="mailto:marcdebiolley@gmail.com"
              className="font-sans text-sm text-white/60 hover:text-white/90 transition-colors"
            >
              marcdebiolley@gmail.com
            </a>
            <a
              href="tel:+32474722414"
              className="font-sans text-sm text-white/60 hover:text-white/90 transition-colors"
            >
              +32 474 72 24 14
            </a>
          </div>

          {/* Copyright */}
          <p className="font-sans text-xs text-white/20">
            © 2026 Portée de Prana
          </p>

        </div>
      </div>
    </footer>
  )
}
