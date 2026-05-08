import { useEffect, useState } from 'react'
import { getSkills, createSkill, updateSkill, deleteSkill } from '../../services/api'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'

const empty = { name: '', proficiency: '' }

export default function SkillsTab() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  const fetchSkills = () => {
    getSkills()
      .then(res => setSkills(res.data.payload))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchSkills() }, [])

  const handleSubmit = async () => {
    setError('')
    if (!form.name || !form.proficiency) {
      setError('All fields are required')
      return
    }
    try {
      if (editingId) {
        await updateSkill(editingId, form)
      } else {
        await createSkill(form)
      }
      setForm(empty)
      setEditingId(null)
      setShowForm(false)
      fetchSkills()
    } catch (err) {
      setError('Something went wrong')
    }
  }

  const handleEdit = (skill) => {
    setForm({ name: skill.name, proficiency: skill.proficiency })
    setEditingId(skill.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return
    await deleteSkill(id)
    fetchSkills()
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
          Skills <span className="text-purple-400">({skills.length})</span>
        </h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 border border-purple-400 text-purple-400 px-4 py-2 font-mono text-sm hover:bg-purple-400/10 transition-all duration-200"
          >
            <Plus size={16} /> Add Skill
          </button>
        )}
      </div>

      {/* form */}
      {showForm && (
        <div className="border border-gray-800 bg-gray-900/30 p-6 mb-6 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-purple-400 to-transparent" />
          <p className="text-purple-400 font-mono text-xs mb-4">
            {editingId ? '// edit skill' : '// new skill'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">SKILL NAME</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="e.g. React"
              />
            </div>
            <div>
              <label className="text-gray-500 font-mono text-xs mb-2 block">PROFICIENCY (1-100)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={form.proficiency}
                onChange={e => setForm({ ...form, proficiency: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
                placeholder="e.g. 85"
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
      ) : skills.length === 0 ? (
        <p className="text-gray-500 font-mono text-sm">No skills yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {skills.map(skill => (
            <div
              key={skill.id}
              className="border border-gray-800 bg-gray-900/20 px-5 py-4 flex items-center justify-between group hover:border-purple-500/30 transition-all duration-200"
            >
              <div className="flex items-center gap-4 flex-1">
                <span className="text-white font-mono text-sm">{skill.name}</span>
                <div className="flex-1 max-w-xs bg-gray-800 h-1 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
                <span className="text-purple-400 font-mono text-xs">{skill.proficiency}%</span>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(skill)}
                  className="text-gray-600 hover:text-purple-400 transition-colors duration-200 p-1"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
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