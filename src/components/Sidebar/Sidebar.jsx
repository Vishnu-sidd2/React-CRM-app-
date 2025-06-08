import { NavLink } from 'react-router-dom'
import { FiHome, FiPackage, FiBarChart2 } from 'react-icons/fi';

import './Sidebar.css'

const Sidebar = () => {
  const menuItems = [
    {
      path: '/dashboard',
      icon: <FiHome />,
      label: 'Dashboard'
    },
    {
      path: '/products',
      icon: <FiPackage />,
      label: 'Products'
    }
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FiBarChart2 className="logo-icon" />
        <h2>CRM System</h2>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar