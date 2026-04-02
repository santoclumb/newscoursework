import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function Home() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/posts').then(res => setPosts(res.data)).catch(() => {})
  }, [])

  return (
    <div style={{ padding: '60px' }}>
      <h1 style={{ fontSize: '72px', fontWeight: 900, lineHeight: 1, marginBottom: '60px' }}>
        ПОСЛЕДНИЕ<br />НОВОСТИ
      </h1>
      {posts.length === 0 && <p style={{ color: '#555' }}>Пока нет новостей</p>}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {posts.map(post => (
          <div key={post._id} onClick={() => navigate(`/article/${post._id}`)}
            style={{ padding: '30px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', cursor: 'pointer' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#555', letterSpacing: '2px' }}>{post.category.toUpperCase()}</span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '8px' }}>{post.title}</h2>
              <p style={{ color: '#555', fontSize: '13px', marginTop: '4px' }}>Автор: {post.author?.name}</p>
            </div>
            <span style={{ fontSize: '12px', color: '#555' }}>{new Date(post.createdAt).toLocaleDateString('ru-RU')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home