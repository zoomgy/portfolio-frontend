import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getSkills } from '../services/api'

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Technical', value: 'technical' },
  { label: 'Soft Skills', value: 'soft' },
]

export default function Skills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    getSkills()
      .then(res => setSkills(res.data.payload))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="skills" className="min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-purple-400 font-mono text-sm mb-2 tracking-widest">02. what I work with</p>
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">
            Skills & <span className="text-purple-400">Technologies</span>
          </h2>
          <div className="w-16 h-0.5 bg-purple-400 mb-12" />
        </motion.div>

        {loading ? (
          <div className="flex gap-2 items-center text-gray-500 font-mono">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        ) : skills.length === 0 ? (
          <p className="text-gray-500 font-mono">No skills added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex justify-between mb-2 items-center">
                  <span className="text-gray-300 font-mono text-sm group-hover:text-purple-400 transition-colors duration-200">
                    {skill.name}
                  </span>
                  <span className="text-purple-400 font-mono text-xs bg-purple-400/10 px-2 py-0.5 border border-purple-400/20">
                    {skill.proficiency}%
                  </span>
                </div>
                <div className="w-full bg-gray-800/50 h-1 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full relative"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}