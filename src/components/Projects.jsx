import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getProjects } from '../services/api'
import { ExternalLink, Link2, X, ChevronLeft, ChevronRight } from 'lucide-react'

function ProjectModal({ project, onClose }) {
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-10"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0f0f0f] border border-gray-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
          onClick={e => e.stopPropagation()}
        >
          {/* top accent */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-purple-400 to-transparent" />

          {/* close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-purple-400 transition-colors duration-200 z-10"
          >
            <X size={20} />
          </button>

          {/* image carousel */}
          {project.imageUrls?.length > 0 && (
            <div className="relative w-full h-56 md:h-72 bg-gray-900 overflow-hidden">
              <img
                src={project.imageUrls[imgIndex]}
                alt={project.title}
                className="w-full h-full object-cover opacity-80"
                onError={e => e.target.style.display = 'none'}
              />
              {project.imageUrls.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex(i => (i - 1 + project.imageUrls.length) % project.imageUrls.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-purple-400/20 border border-gray-700 text-white p-1 transition-all duration-200"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setImgIndex(i => (i + 1) % project.imageUrls.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-purple-400/20 border border-gray-700 text-white p-1 transition-all duration-200"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {project.imageUrls.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === imgIndex ? 'bg-purple-400' : 'bg-gray-600'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* content */}
          <div className="p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h2 className="text-2xl font-bold font-mono text-white">
                {project.title}
              </h2>
              <div className="flex gap-3 shrink-0">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 text-gray-400 hover:text-purple-400 transition-colors duration-200 font-mono text-xs border border-gray-700 hover:border-purple-400 px-3 py-1.5"
                  >
                    <Link2 size={14} /> Code
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors duration-200 font-mono text-xs border border-purple-400 hover:border-purple-300 px-3 py-1.5"
                  >
                    <ExternalLink size={14} /> Live
                  </a>
                )}
              </div>
            </div>

            {/* tech stack */}
            {project.techStack?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="text-purple-400 font-mono text-xs bg-purple-400/5 border border-purple-400/20 px-2 py-0.5">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* full description */}
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 font-mono text-xs mb-3 tracking-widest">// about this project</p>
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
                {project.fullDescription}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getProjects()
      .then(res => setProjects(res.data.payload))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="projects" className="min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-purple-400 font-mono text-sm mb-2 tracking-widest">03. what I have built</p>
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">
            Featured <span className="text-purple-400">Projects</span>
          </h2>
          <div className="w-16 h-0.5 bg-purple-400 mb-12" />
        </motion.div>

        {loading ? (
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        ) : projects.length === 0 ? (
          <p className="text-gray-500 font-mono">No projects added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelected(project)}
                className="card-glow border border-gray-800 bg-gray-900/30 p-6 hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-purple-400 to-transparent transition-all duration-500" />

                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 border border-purple-400/30 flex items-center justify-center text-purple-400 font-mono text-lg group-hover:border-purple-400 transition-all duration-200">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-gray-600 hover:text-purple-400 transition-colors duration-200"
                      >
                        <Link2 size={18} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-gray-600 hover:text-purple-400 transition-colors duration-200"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors duration-200 font-mono">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {project.shortDescription}
                </p>

                {project.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-purple-400 font-mono text-xs bg-purple-400/5 border border-purple-400/20 px-2 py-0.5">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-gray-600 font-mono text-xs mt-4 group-hover:text-purple-400/50 transition-colors duration-200">
                  click to view details →
                </p>

              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}

    </section>
  )
}