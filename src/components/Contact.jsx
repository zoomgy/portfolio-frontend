import { motion } from 'framer-motion'
import { Mail, Link2, MapPin } from 'lucide-react'

const contactLinks = [
  {
    icon: <Mail size={18} />,
    label: 'ayushwork0@gmail.com',
    href: 'mailto:ayushwork0@gmail.com',
  },
  {
    icon: <Link2 size={18} />,
    label: 'linkedin.com/in/ayushwork0',
    href: 'https://www.linkedin.com/in/ayushwork0/',
  },
  {
    icon: <Link2 size={18} />,
    label: 'github.com/zoomgy',
    href: 'https://github.com/zoomgy',
  },
  {
    icon: <MapPin size={18} />,
    label: 'Bangalore, India',
    href: null,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen px-6 py-24 flex items-center">
      <div className="max-w-4xl mx-auto w-full">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-purple-400 font-mono text-sm mb-2 tracking-widest">06. what is next</p>
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">
            Get In <span className="text-purple-400">Touch</span>
          </h2>
          <div className="w-16 h-0.5 bg-purple-400 mb-12" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-400 leading-relaxed mb-8 text-sm">
              I am currently open to new opportunities. Whether you have a question,
              a project in mind, or just want to say hi —
              my inbox is always open!
            </p>

            <div className="flex flex-col gap-4">
              {contactLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-200 group"
                    >
                      <span className="text-purple-400 group-hover:scale-110 transition-transform duration-200">
                        {link.icon}
                      </span>
                      <span className="font-mono text-sm">{link.label}</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 text-gray-500">
                      <span className="text-purple-400/50">{link.icon}</span>
                      <span className="font-mono text-sm">{link.label}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="border border-gray-800 bg-gray-900/30 p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-purple-400 to-transparent transition-all duration-500" />

            <p className="text-gray-500 font-mono text-xs mb-6 tracking-widest">
              // let's build something together
            </p>

            <h3 className="text-white font-bold text-2xl font-mono mb-4">
              Open to <span className="text-purple-400">opportunities</span>
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Currently looking for full-time roles and freelance projects.
              If you think we'd be a good fit, let's talk!
            </p>

            <a
              href="mailto:ayushwork0@gmail.com"
              className="inline-flex items-center gap-2 border border-purple-400 text-purple-400 px-6 py-3 font-mono text-sm hover:bg-purple-400/10 transition-all duration-200"
            >
              <Mail size={16} />
              Say Hello
            </a>

          </motion.div>

        </div>

        {/* bottom bar */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-gray-700 font-mono text-xs mt-24"
        >
          Built with <span className="text-purple-400">React + Spring Boot</span> by Ayush Pratap Singh
        </motion.p>

      </div>
    </section>
  )
}