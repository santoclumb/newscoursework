import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '', category: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      await api.post('/posts', form)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка')
    }
  }

  return (
    <div style={{ padding: '80px 60px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '40px' }}>НОВЫЙ ПОСТ</h1>
      {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
      <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input placeholder="Заголовок" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          style={{ background: 'transparent', border: '1px solid #333', color: '#fff', padding: '14px 16px', fontSize: '14px', outline: 'none' }} />
        <input placeholder="Категория (например: Спорт)" value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          style={{ background: 'transparent', border: '1px solid #333', color: '#fff', padding: '14px 16px', fontSize: '14px', outline: 'none' }} />
        <textarea placeholder="Содержание статьи..." value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          style={{ background: 'transparent', border: '1px solid #333', color: '#fff', padding: '14px 16px', fontSize: '14px', outline: 'none', resize: 'vertical', minHeight: '200px' }} />
        <button onClick={handleSubmit}
          style={{ background: '#fff', color: '#000', border: 'none', padding: '16px', fontSize: '14px', fontWeight: 700, letterSpacing: '1px' }}>
          ОПУБЛИКОВАТЬ
        </button>
      </div>
    </div>
  )
}

export default CreatePost