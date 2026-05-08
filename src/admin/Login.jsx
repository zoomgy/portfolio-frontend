import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loginUser } from '../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await loginUser(email, password)
      const token = res.data.payload
      localStorage.setItem('token', token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md border border-gray-800 bg-gray-900/30 p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-purple-400 to-transparent" />

        <p className="text-purple-400 font-mono text-xs mb-2 tracking-widest">// admin access</p>
        <h1 className="text-2xl font-bold font-mono text-white mb-8">
          Admin <span className="text-purple-400">Login</span>
        </h1>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-500 font-mono text-xs mb-2 block">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
              placeholder="admin@email.com"
            />
          </div>

          <div>
            <label className="text-gray-500 font-mono text-xs mb-2 block">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full bg-gray-800/50 border border-gray-700 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-purple-400 transition-colors duration-200"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 font-mono text-xs">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-2 bg-purple-500/10 border border-purple-400 text-purple-400 px-6 py-3 font-mono text-sm hover:bg-purple-400/20 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </div>

      </motion.div>
    </div>
  )
}