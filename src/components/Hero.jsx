import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

const roles = ['Software Engineer', 'Full Stack Developer', 'AI Enthusiast']

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 relative">

      {/* top right decoration */}
      <div className="absolute top-20 right-10 w-64 h-64 border border-purple-500/10 rounded-full" />
      <div className="absolute top-32 right-20 w-40 h-40 border border-purple-500/10 rounded-full" />

      <div className="max-w-4xl w-full">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-purple-400 font-mono mb-4 tracking-widest text-sm"
        >
          &gt; Hello, world! I am
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight glow"
        >
          Ayush Pratap
          <br />
          <span className="text-purple-400">Singh</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl font-mono text-gray-500 mb-6"
        >
          &lt; Software Engineer · Full Stack · AI &gt;
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-gray-400 max-w-xl mb-10 leading-relaxed text-sm"
        >
          I build scalable backend systems and modern web applications.
          Currently working at <span className="text-purple-400">Capgemini</span> with{' '}
          <span className="text-purple-400">SpringBoot, React, AWS</span> and AI integrations
          using <span className="text-purple-400">Microservices.</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex gap-4 flex-wrap items-center"
        >
          <Link
            to="projects"
            smooth={true}
            duration={500}
            offset={-70}
            className="bg-purple-500/10 border border-purple-400 text-purple-400 px-8 py-3 font-mono text-sm cursor-pointer hover:bg-purple-400/20 transition-all duration-200"
          >
            View My Work
          </Link>

          <Link
            to="contact"
            smooth={true}
            duration={500}
            offset={-70}
            className="text-gray-400 px-6 py-3 font-mono text-sm cursor-pointer hover:text-purple-400 transition-all duration-200 flex items-center gap-2"
          >
            Get In Touch <span className="text-purple-400">→</span>
          </Link>
        </motion.div>

        {/* stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex gap-10 mt-16 border-t border-gray-800 pt-8"
        >
          {[
            { number: '2+', label: 'Years Experience' },
            { number: '10+', label: 'Projects Built' },
            { number: '5+', label: 'Technologies' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-purple-400 font-mono">{stat.number}</p>
              <p className="text-gray-500 text-xs font-mono">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}