'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { href: '#prana', label: 'Prana' },
  { href: '#papa', label: 'Le papa' },
  { href: '#portee', label: 'La portée' },
  { href: '#adoption', label: 'Adoption' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: scrolled ? 'rgba(249,247,244,0.95)' : 'rgba(249,247,244,0)',
        backdropFilter: scrolled ? 'blur(8px)' : 'blur(0px)',
        boxShadow: scrolled ? '0 1px 0 rgba(28,28,26,0.08)' : '0 0 0 rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-serif text-lg font-bold text-text tracking-wide"
        >
          Portée de Prana
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm text-text/70 hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-text transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <span className={`block w-6 h-0.5 bg-text transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-text transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-bg border-t border-text/10 px-6 py-4"
        >
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-text/80 hover:text-accent transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  )
}
