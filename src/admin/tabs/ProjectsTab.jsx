import { useEffect, useState } from 'react'
import { getProjects, createProject, updateProject, deleteProject } from '../../services/api'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'

const empty = {
  title: '',
  shortDescription: '',
  fullDescription: '',
  githubUrl: '',
  liveUrl: '',
  techStack: '',
  imageUrls: '',
}

export default function ProjectsTab() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  const fetchProjects = () => {
    getProjects()
      .then(res => setProjects(res.data.payload))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProjects() }, [])

  const handleSubmit = async () => {
    setError('')
    if (!form.title || !form.shortDescription || !form.fullDescription) {
      setError('Title, short and full description are required')
      return
    }
    try {
      const payload = {
        ...form,
        techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
        imageUrls: form.imageUrls.split(',').map(t => t.trim()).filter(Boolean),
      }
      if (editingId) {
        await updateProject(editingId, payload)
      } else {
        await createProject(payload)
      }
      setForm(empty)
      setEditingId(null)
      setShowForm(false)
      fetchProjects()
    } catch (err) {
      setError('Something went wrong')
    }
  }

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      shortDescription: project.shortDescription,
      fullDescription: project.fullDescription,
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      techStack: project.techStack?.join(', ') || '',
      imageUrls: project.imageUrls?.join(', ') || '',
    })
    setEditingId(project.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return
    await deleteProject(id)
    fetchProjects()
  }

  const handleCancel = () => {
    setForm(empty)
    setEditingId(null)
    setShowForm(false)
    setError('')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-mono text-white">
          Projects <span className="text-purple-400">({projects.length})</span>
        </h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 border border-purple-400 text-purple-400 px-4 py-2 font-mono text-sm hover:bg-purple-400/10 transition-all duration-200"
          >
            <Plus size={16} /> Add Project
          </button>
        )}
      </div>

      {/* form */}
      {showForm && (
        <div className="border border-gray-800 bg-gray-900/30 p-6 mb-6 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-purple-400 to-transparent" />
          <p className="text-purple-400 font-mono text-xs mb-4">
            {editingId ? '// edit project' : '// new project'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">TITLE</label>
              <input
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="e.g. Portfolio Website"
              />
            </div>
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">GITHUB URL</label>
              <input
                value={form.githubUrl}
                onChange={e => setForm({ ...form, githubUrl: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">LIVE URL</label>
              <input
                value={form.liveUrl}
                onChange={e => setForm({ ...form, liveUrl: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">TECH STACK (comma separated)</label>
              <input
                value={form.techStack}
                onChange={e => setForm({ ...form, techStack: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="React, Spring Boot, PostgreSQL"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-500 font-mono text-xs mb-2 block">IMAGE URLS (comma separated)</label>
              <input
                value={form.imageUrls}
                onChange={e => setForm({ ...form, imageUrls: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="https://image1.com, https://image2.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-500 font-mono text-xs mb-2 block">SHORT DESCRIPTION (max 200 chars)</label>
              <input
                value={form.shortDescription}
                onChange={e => setForm({ ...form, shortDescription: e.target.value })}
                maxLength={200}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="Brief summary..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-500 font-mono text-xs mb-2 block">FULL DESCRIPTION</label>
              <textarea
                value={form.fullDescription}
                onChange={e => setForm({ ...form, fullDescription: e.target.value })}
                rows={4}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200 resize-none"
                placeholder="Detailed description..."
              />
            </div>
          </div>
          {error && <p className="text-red-400 font-mono text-xs mb-4">{error}</p>}
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-purple-500/10 border border-purple-400 text-purple-400 px-4 py-2 font-mono text-sm hover:bg-purple-400/20 transition-all duration-200"
            >
              <Check size={16} /> {editingId ? 'Update' : 'Create'}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 border border-gray-700 text-gray-400 px-4 py-2 font-mono text-sm hover:border-gray-500 transition-all duration-200"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* list */}
      {loading ? (
        <p className="text-gray-500 font-mono text-sm">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500 font-mono text-sm">No projects yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map(project => (
            <div
              key={project.id}
              className="border border-gray-800 bg-gray-900/20 px-5 py-4 flex items-start justify-between group hover:border-purple-500/30 transition-all duration-200"
            >
              <div>
                <p className="text-white font-mono text-sm font-bold">{project.title}</p>
                <p className="text-gray-400 text-xs mt-0.5">{project.shortDescription}</p>
                {project.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-purple-400 font-mono text-xs bg-purple-400/5 border border-purple-400/20 px-2 py-0.5">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 ml-4 shrink-0">
                <button
                  onClick={() => handleEdit(project)}
                  className="text-gray-600 hover:text-purple-400 transition-colors duration-200 p-1"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-gray-600 hover:text-red-400 transition-colors duration-200 p-1"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}