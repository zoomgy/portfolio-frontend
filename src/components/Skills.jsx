import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getSkills } from '../services/api'

const techKeywords = [
  'java', 'spring', '.net', 'angular', 'react', 'python', 'sql', 'azure',
  'docker', 'git', 'javascript', 'typescript', 'html', 'css', 'node',
  'postgresql', 'mongodb', 'redis', 'kafka', 'aws', 'kubernetes', 'c#',
  'semantic kernel', 'openai', 'rest', 'api', 'hibernate', 'maven',
  'react','linux', 'k8s','ci','cloud','deployement','data'
]

const categorize = (name) => {
  const lower = name.toLowerCase()
  return techKeywords.some(k => lower.includes(k)) ? 'technical' : 'soft'
}

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Technical', value: 'technical' },
  { label: 'Soft Skills', value: 'soft' },
]

export default function Skills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    getSkills()
      .then(res => setSkills(res.data.payload))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = skills.filter(skill =>
    activeTab === 'all' ? true : categorize(skill.name) === activeTab
  )

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
          <div className="w-16 h-0.5 bg-purple-400 mb-8" />
        </motion.div>

        {/* filter tabs */}
        <div className="flex gap-1 mb-10 border-b border-gray-800">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-2.5 font-mono text-sm transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab.value
                  ? 'text-purple-400 border-purple-400'
                  : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              {tab.label}
              <span className={`ml-2 text-xs ${
                activeTab === tab.value ? 'text-purple-400' : 'text-gray-600'
              }`}>
                ({tab.value === 'all' ? skills.length : skills.filter(s => categorize(s.name) === tab.value).length})
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 font-mono text-sm">No skills in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
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
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
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