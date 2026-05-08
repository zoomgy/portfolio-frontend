import { useEffect, useState } from 'react'
import { getEducation, createEducation, updateEducation, deleteEducation } from '../../services/api'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'

const empty = {
  institutionName: '',
  degree: '',
  fieldOfStudy: '',
  startYear: '',
  endYear: '',
  cgpa: '',
  description: '',
}

export default function EducationTab() {
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  const fetchEducation = () => {
    getEducation()
      .then(res => setEducation(res.data.payload))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchEducation() }, [])

  const handleSubmit = async () => {
    setError('')
    if (!form.institutionName || !form.degree || !form.startYear) {
      setError('Institution, degree and start year are required')
      return
    }
    try {
      if (editingId) {
        await updateEducation(editingId, form)
      } else {
        await createEducation(form)
      }
      setForm(empty)
      setEditingId(null)
      setShowForm(false)
      fetchEducation()
    } catch (err) {
      setError('Something went wrong')
    }
  }

  const handleEdit = (edu) => {
    setForm({
      institutionName: edu.institutionName,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy || '',
      startYear: edu.startYear || '',
      endYear: edu.endYear || '',
      cgpa: edu.cgpa || '',
      description: edu.description || '',
    })
    setEditingId(edu.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education?')) return
    await deleteEducation(id)
    fetchEducation()
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
          Education <span className="text-purple-400">({education.length})</span>
        </h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 border border-purple-400 text-purple-400 px-4 py-2 font-mono text-sm hover:bg-purple-400/10 transition-all duration-200"
          >
            <Plus size={16} /> Add Education
          </button>
        )}
      </div>

      {/* form */}
      {showForm && (
        <div className="border border-gray-800 bg-gray-900/30 p-6 mb-6 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-purple-400 to-transparent" />
          <p className="text-purple-400 font-mono text-xs mb-4">
            {editingId ? '// edit education' : '// new education'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">INSTITUTION</label>
              <input
                value={form.institutionName}
                onChange={e => setForm({ ...form, institutionName: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="e.g. GLA University"
              />
            </div>
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">DEGREE</label>
              <input
                value={form.degree}
                onChange={e => setForm({ ...form, degree: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="e.g. B.Tech CSE"
              />
            </div>
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">FIELD OF STUDY</label>
              <input
                value={form.fieldOfStudy}
                onChange={e => setForm({ ...form, fieldOfStudy: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="e.g. Computer Science"
              />
            </div>
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">CGPA</label>
              <input
                type="number"
                step="0.01"
                value={form.cgpa}
                onChange={e => setForm({ ...form, cgpa: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="e.g. 7.9"
              />
            </div>
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">START YEAR</label>
              <input
                type="number"
                value={form.startYear}
                onChange={e => setForm({ ...form, startYear: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="e.g. 2021"
              />
            </div>
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">END YEAR</label>
              <input
                type="number"
                value={form.endYear}
                onChange={e => setForm({ ...form, endYear: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="e.g. 2025"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-gray-500 font-mono text-xs mb-2 block">DESCRIPTION</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200 resize-none"
              placeholder="Additional details..."
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
      ) : education.length === 0 ? (
        <p className="text-gray-500 font-mono text-sm">No education yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {education.map(edu => (
            <div
              key={edu.id}
              className="border border-gray-800 bg-gray-900/20 px-5 py-4 flex items-start justify-between group hover:border-purple-500/30 transition-all duration-200"
            >
              <div>
                <p className="text-white font-mono text-sm font-bold">{edu.degree} {edu.fieldOfStudy && `— ${edu.fieldOfStudy}`}</p>
                <p className="text-purple-400 font-mono text-xs mt-0.5">{edu.institutionName}</p>
                <p className="text-gray-600 font-mono text-xs mt-0.5">
                  {edu.startYear} — {edu.endYear ?? 'Present'} {edu.cgpa && `· CGPA: ${edu.cgpa}`}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(edu)}
                  className="text-gray-600 hover:text-purple-400 transition-colors duration-200 p-1"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
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