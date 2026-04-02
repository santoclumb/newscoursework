import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

function Article() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    api.get(`/posts/${id}`).then(res => setPost(res.data)).catch(() => navigate('/'))
    api.get(`/comments/${id}`).then(res => setComments(res.data)).catch(() => {})
  }, [id])

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}`)
      navigate('/')
    } catch {
      setError('Ошибка удаления')
    }
  }

  const handleComment = async () => {
    if (!text.trim()) return
    try {
      const res = await api.post(`/comments/${id}`, { text })
      setComments([res.data, ...comments])
      setText('')
    } catch {
      setError('Войдите чтобы комментировать')
    }
  }

  if (!post) return <div style={{ padding: '60px', color: '#555' }}>Загрузка...</div>

  return (
    <div style={{ padding: '60px', maxWidth: '800px' }}>
      <span style={{ fontSize: '11px', color: '#555', letterSpacing: '2px' }}>{post.category?.toUpperCase()}</span>
      <h1 style={{ fontSize: '48px', fontWeight: 900, margin: '16px 0' }}>{post.title}</h1>
      <p style={{ color: '#555', fontSize: '13px', marginBottom: '40px' }}>
        Автор: {post.author?.name} · {new Date(post.createdAt).toLocaleDateString('ru-RU')}
      </p>
      <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '60px' }}>{post.content}</p>

      {user?.role === 'journalist' && (
        <div style={{ display: 'flex', gap: '16px', marginBottom: '60px' }}>
          <button onClick={() => navigate(`/edit/${id}`)}
            style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '10px 24px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            РЕДАКТИРОВАТЬ
          </button>
          <button onClick={handleDelete}
            style={{ background: 'transparent', border: '1px solid #555', color: '#555', padding: '10px 24px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            УДАЛИТЬ
          </button>
        </div>
      )}

      <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px' }}>КОММЕНТАРИИ</h2>
      {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
      {user ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Ваш комментарий..."
            style={{ background: 'transparent', border: '1px solid #333', color: '#fff', padding: '14px', fontSize: '14px', outline: 'none', resize: 'vertical', minHeight: '80px' }} />
          <button onClick={handleComment}
            style={{ background: '#fff', color: '#000', border: 'none', padding: '14px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start', minWidth: '160px' }}>
            ОТПРАВИТЬ
          </button>
        </div>
      ) : (
        <p style={{ color: '#555', marginBottom: '40px' }}>Войдите чтобы оставить комментарий</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {comments.map(c => (
          <div key={c._id} style={{ borderBottom: '1px solid #222', paddingBottom: '24px' }}>
            <p style={{ fontWeight: 700, marginBottom: '8px' }}>{c.author?.name}</p>
            <p style={{ color: '#aaa', fontSize: '14px' }}>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Article