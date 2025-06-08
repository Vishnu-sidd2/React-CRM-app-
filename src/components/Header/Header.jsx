import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { FiLogOut, FiUser } from 'react-icons/fi'
import toast from 'react-hot-toast'
import './Header.css'

const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="page-title">
          <h1>Welcome back, {user?.firstName || 'User'}!</h1>
          <p>Manage your business efficiently</p>
        </div>
        
        <div className="header-actions">
          <div className="user-info">
            <div className="user-avatar">
              <FiUser />
            </div>
            <div className="user-details">
              <span className="user-name">{user?.firstName} {user?.lastName}</span>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>
          
          <button className="logout-button" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header