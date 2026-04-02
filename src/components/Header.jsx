import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '20px 60px', borderBottom: '1px solid #222'
    }}>
      <Link to="/" style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '2px' }}>NEWSPORTAL</Link>
      <nav style={{ display: 'flex', gap: '30px', fontSize: '14px', fontWeight: 600, alignItems: 'center' }}>
        <Link to="/">Главная</Link>
        {user ? (
          <>
            <span style={{ color: '#555' }}>{user.name} ({user.role === 'journalist' ? 'Журналист' : 'Читатель'})</span>
            {user.role === 'journalist' && <Link to="/create">+ Создать пост</Link>}
            <button onClick={logout} style={{ background: 'none', border: '1px solid #333', color: '#fff', padding: '6px 16px', fontSize: '14px', cursor: 'pointer' }}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login">Войти</Link>
            <Link to="/register">Регистрация</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header