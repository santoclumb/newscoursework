import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'reader' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const res = await api.post('/auth/register', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка регистрации')
    }
  }

  return (
    <div style={{ padding: '80px 60px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '40px' }}>РЕГИСТРАЦИЯ</h1>
      {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
      <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input type="text" placeholder="Имя" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={{ background: 'transparent', border: '1px solid #333', color: '#fff', padding: '14px 16px', fontSize: '14px', outline: 'none' }} />
        <input type="email" placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={{ background: 'transparent', border: '1px solid #333', color: '#fff', padding: '14px 16px', fontSize: '14px', outline: 'none' }} />
        <input type="password" placeholder="Пароль" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={{ background: 'transparent', border: '1px solid #333', color: '#fff', padding: '14px 16px', fontSize: '14px', outline: 'none' }} />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
          style={{ background: '#000', border: '1px solid #333', color: '#fff', padding: '14px 16px', fontSize: '14px', outline: 'none' }}>
          <option value="reader">Читатель</option>
          <option value="journalist">Журналист</option>
        </select>
        <button onClick={handleSubmit}
          style={{ background: '#fff', color: '#000', border: 'none', padding: '16px', fontSize: '14px', fontWeight: 700, letterSpacing: '1px', marginTop: '8px' }}>
          ЗАРЕГИСТРИРОВАТЬСЯ
        </button>
      </div>
    </div>
  )
}

export default Register