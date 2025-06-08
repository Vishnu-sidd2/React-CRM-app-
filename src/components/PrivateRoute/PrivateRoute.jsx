import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
   console.log('PrivateRoute - isAuthenticated:', isAuthenticated)
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute