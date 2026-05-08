import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getExperiences } from '../services/api'

export default function Experience() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present'
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  useEffect(() => {
    getExperiences()
      .then(res => setExperiences(res.data.payload))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="experience" className="min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-purple-400 font-mono text-sm mb-2 tracking-widest">04. where I have worked</p>
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">
            Work <span className="text-purple-400">Experience</span>
          </h2>
          <div className="w-16 h-0.5 bg-purple-400 mb-12" />
        </motion.div>

        {loading ? (
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        ) : experiences.length === 0 ? (
          <p className="text-gray-500 font-mono">No experience added yet.</p>
        ) : (
          <div className="flex flex-col gap-0">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex gap-6 group"
              >
                {/* timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mt-1.5 group-hover:shadow-lg group-hover:shadow-purple-400/50 transition-all duration-200 shrink-0" />
                  {index !== experiences.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-purple-400 to-gray-800 my-1" />
                  )}
                </div>

                {/* content */}
                <div className="pb-10">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="text-white font-bold text-lg font-mono group-hover:text-purple-400 transition-colors duration-200">
                      {exp.role}
                    </h3>
                    {exp.currentlyWorking && (
                      <span className="text-xs font-mono bg-purple-400/10 border border-purple-400/30 text-purple-400 px-2 py-0.5">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="text-purple-400 font-mono text-sm mb-1">
                    {exp.companyName} {exp.location && `· ${exp.location}`}
                  </p>

                  <p className="text-gray-600 font-mono text-xs mb-4">
                    {formatDate(exp.startDate)} — {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                  </p>

                  <p className="text-gray-400 text-sm leading-relaxed border-l border-gray-800 pl-4">
                    {exp.description}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}