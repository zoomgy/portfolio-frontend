import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SkillsTab from './tabs/SkillsTab'
import ProjectsTab from './tabs/ProjectsTab'
import ExperienceTab from './tabs/ExperienceTab'
import EducationTab from './tabs/EducationTab'

const tabs = [
  { label: 'Skills', value: 'skills' },
  { label: 'Projects', value: 'projects' },
  { label: 'Experience', value: 'experience' },
  { label: 'Education', value: 'education' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('skills')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* top bar */}
      <div className="border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-mono font-bold text-white">
            &lt;<span className="text-purple-400">Admin</span> /&gt;
          </span>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 font-mono text-sm transition-colors duration-200"
          >
            Logout →
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* tabs */}
        <div className="flex gap-1 mb-10 border-b border-gray-800">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-6 py-3 font-mono text-sm transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab.value
                  ? 'text-purple-400 border-purple-400'
                  : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* tab content */}
        {activeTab === 'skills' && <SkillsTab />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'experience' && <ExperienceTab />}
        {activeTab === 'education' && <EducationTab />}

      </div>
    </div>
  )
}