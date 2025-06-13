import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from '../../store/slices/authSlice'
import toast from 'react-hot-toast'
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import './Login.css'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!credentials.username || !credentials.password) {
      toast.error('Please fill in all fields')
      return
    }

    const result = await dispatch(loginUser(credentials))
    if (result.type === 'auth/loginUser/fulfilled') {
      toast.success('Login successful!')
    }
  }

  const fillDemoCredentials = () => {
    setCredentials({
      username: 'emilys',
      password: 'emilyspass',
    })
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="half-moon" />
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your CRM account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
               
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <button
              type="button"
              className="demo-button"
              onClick={fillDemoCredentials}
            >
              Use Demo Credentials
            </button>
          </form>

          <div className="login-footer">
            <p>Demo Credentials: emilys / emilyspass</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
