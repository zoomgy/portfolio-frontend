import { useEffect, useState } from 'react'
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../../services/api'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'

const empty = {
  role: '',
  companyName: '',
  location: '',
  description: '',
  startDate: '',
  endDate: '',
  currentlyWorking: false,
}

export default function ExperienceTab() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  const fetchExperiences = () => {
    getExperiences()
      .then(res => setExperiences(res.data.payload))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchExperiences() }, [])

  const handleSubmit = async () => {
    setError('')
    if (!form.role || !form.companyName || !form.startDate) {
      setError('Role, company and start date are required')
      return
    }
    try {
      const payload = {
                    ...form,
                    startDate: form.startDate ? form.startDate + 'T00:00:00' : null,
                    endDate: form.currentlyWorking ? null : (form.endDate ? form.endDate + 'T00:00:00' : null),
                    }
      if (editingId) {
        await updateExperience(editingId, payload)
      } else {
        await createExperience(payload)
      }
      setForm(empty)
      setEditingId(null)
      setShowForm(false)
      fetchExperiences()
    } catch (err) {
      setError('Something went wrong')
    }
  }

  const handleEdit = (exp) => {
    setForm({
      role: exp.role,
      companyName: exp.companyName,
      location: exp.location || '',
      description: exp.description || '',
      startDate: exp.startDate?.slice(0, 10) || '',
      endDate: exp.endDate?.slice(0, 10) || '',
      currentlyWorking: exp.currentlyWorking || false,
    })
    setEditingId(exp.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience?')) return
    await deleteExperience(id)
    fetchExperiences()
  }

  const handleCancel = () => {
    setForm(empty)
    setEditingId(null)
    setShowForm(false)
    setError('')
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present'
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-mono text-white">
          Experience <span className="text-purple-400">({experiences.length})</span>
        </h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 border border-purple-400 text-purple-400 px-4 py-2 font-mono text-sm hover:bg-purple-400/10 transition-all duration-200"
          >
            <Plus size={16} /> Add Experience
          </button>
        )}
      </div>

      {/* form */}
      {showForm && (
        <div className="border border-gray-800 bg-gray-900/30 p-6 mb-6 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-purple-400 to-transparent" />
          <p className="text-purple-400 font-mono text-xs mb-4">
            {editingId ? '// edit experience' : '// new experience'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">ROLE</label>
              <input
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="e.g. Software Engineer"
              />
            </div>
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">COMPANY</label>
              <input
                value={form.companyName}
                onChange={e => setForm({ ...form, companyName: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="e.g. Capgemini"
              />
            </div>
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">LOCATION</label>
              <input
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="e.g. Bangalore, India"
              />
            </div>
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">START DATE</label>
              <input
                type="date"
                value={form.startDate}
                onChange={e => setForm({ ...form, startDate: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
              />
            </div>
            {!form.currentlyWorking && (
              <div>
                <label className="text-gray-500 font-mono text-xs mb-2 block">END DATE</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={e => setForm({ ...form, endDate: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                />
              </div>
            )}
            <div className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                id="currentlyWorking"
                checked={form.currentlyWorking}
                onChange={e => setForm({ ...form, currentlyWorking: e.target.checked })}
                className="accent-purple-400 w-4 h-4"
              />
              <label htmlFor="currentlyWorking" className="text-gray-400 font-mono text-sm cursor-pointer">
                Currently working here
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-gray-500 font-mono text-xs mb-2 block">DESCRIPTION</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200 resize-none"
              placeholder="Describe your role..."
            />
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
      ) : experiences.length === 0 ? (
        <p className="text-gray-500 font-mono text-sm">No experience yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {experiences.map(exp => (
            <div
              key={exp.id}
              className="border border-gray-800 bg-gray-900/20 px-5 py-4 flex items-start justify-between group hover:border-purple-500/30 transition-all duration-200"
            >
              <div>
                <p className="text-white font-mono text-sm font-bold">{exp.role}</p>
                <p className="text-purple-400 font-mono text-xs mt-0.5">{exp.companyName} {exp.location && `· ${exp.location}`}</p>
                <p className="text-gray-600 font-mono text-xs mt-0.5">
                  {formatDate(exp.startDate)} — {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(exp)}
                  className="text-gray-600 hover:text-purple-400 transition-colors duration-200 p-1"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
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