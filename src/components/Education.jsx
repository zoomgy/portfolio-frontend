import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getEducation } from '../services/api'

export default function Education() {
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEducation()
      .then(res => setEducation(res.data.payload))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="education" className="min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-purple-400 font-mono text-sm mb-2 tracking-widest">05. where I studied</p>
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">
            <span className="text-purple-400">Education</span> & Qualifications
          </h2>
          <div className="w-16 h-0.5 bg-purple-400 mb-12" />
        </motion.div>

        {loading ? (
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        ) : education.length === 0 ? (
          <p className="text-gray-500 font-mono">No education added yet.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-glow border border-gray-800 bg-gray-900/30 p-6 hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden"
              >
                {/* top accent line */}
                <div className="absolute top-0 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-purple-400 to-transparent transition-all duration-500" />

                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h3 className="text-white font-bold text-lg font-mono group-hover:text-purple-400 transition-colors duration-200">
                      {edu.degree}
                      {edu.fieldOfStudy && (
                        <span className="text-purple-400"> — {edu.fieldOfStudy}</span>
                      )}
                    </h3>
                    <p className="text-gray-400 font-mono text-sm mt-1">
                      {edu.institutionName}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-purple-400 font-mono text-sm">
                      {edu.startYear} — {edu.endYear ?? 'Present'}
                    </p>
                    {edu.cgpa && (
                      <p className="text-gray-500 font-mono text-xs mt-1">
                        CGPA: <span className="text-purple-400">{edu.cgpa}</span>
                      </p>
                    )}
                  </div>
                </div>

                {edu.description && (
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed border-t border-gray-800 pt-4">
                    {edu.description}
                  </p>
                )}

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}