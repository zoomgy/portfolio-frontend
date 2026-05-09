import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'

const navLinks = [
  { label: 'About', to: 'hero' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Experience', to: 'experience' },
  { label: 'Education', to: 'education' },
  { label: 'Contact', to: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-purple-500/20 py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="hero"
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          <span className="text-xl font-bold text-white font-mono tracking-widest">
            &lt;<span className="text-purple-400">Ayush</span> /&gt;
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link, index) => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth={true}
                duration={500}
                offset={-70}
                onSetActive={() => setActive(link.to)}
                className={`cursor-pointer transition-colors duration-200 text-sm font-mono relative group ${
                  active === link.to ? 'text-purple-400' : 'text-gray-400 hover:text-purple-400'
                }`}
              >
                <span className="text-purple-400 text-xs mr-1">0{index + 1}.</span>
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-purple-400 transition-all duration-200 ${
                  active === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            </li>
          ))}

          <li>
            {import.meta.env.VITE_RESUME_AVAILABLE === 'true' ? (
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="border border-purple-400 text-purple-400 px-4 py-2 font-mono text-sm hover:bg-purple-400/10 transition-all duration-200"
              >
                Resume
              </a>
            ) : (
              <span className="border border-gray-700 text-gray-600 px-4 py-2 font-mono text-sm cursor-not-allowed">
                Resume Soon
              </span>
            )}
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`w-6 h-0.5 bg-purple-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-purple-400 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-purple-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* Mobile Menu */}
    <div className={`md:hidden transition-all duration-300 overflow-hidden ${
      menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
    }`}>
      <ul className="bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-purple-500/20 px-6 py-6 flex flex-col gap-5">
        {navLinks.map((link, index) => (
          <li key={link.to}>
            <Link
              to={link.to}
              smooth={true}
              duration={500}
              offset={-70}
                  className="text-gray-400 hover:text-purple-400 cursor-pointer transition-colors duration-200 text-sm font-mono"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-purple-400 text-xs mr-2">0{index + 1}.</span>
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Resume button in mobile menu */}
            <li>
              {import.meta.env.VITE_RESUME_AVAILABLE === 'true' ? (
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block border border-purple-400 text-purple-400 px-4 py-2 font-mono text-sm hover:bg-purple-400/10 transition-all duration-200"
                >
                  Resume
                </a>
              ) : (
                <span className="inline-block border border-gray-700 text-gray-600 px-4 py-2 font-mono text-sm cursor-not-allowed">
                  Resume Soon
                </span>
              )}
            </li>
          </ul>
        </div>

    </nav>
  )
}