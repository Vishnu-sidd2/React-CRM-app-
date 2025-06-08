import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../store/slices/productSlice'
import StatsCard from './StatsCard'
import SalesChart from './SalesChart'
import CategoryChart from './CategoryChart'
import RecentProducts from './RecentProducts'
import { FiPackage, FiDollarSign, FiTrendingUp, FiUsers } from 'react-icons/fi'
import './Dashboard.css'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products)

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products.length])

  // Calculate statistics
  const totalProducts = products.length
  const totalRevenue = products.reduce((sum, product) => sum + (product.price * product.stock), 0)
  const averagePrice = totalProducts > 0 ? (products.reduce((sum, product) => sum + product.price, 0) / totalProducts) : 0
  const topCategory = products.length > 0 ? 
    Object.entries(products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    }, {})).sort(([,a], [,b]) => b - a)[0]?.[0] : 'N/A'

  const statsData = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: <FiPackage />,
      color: '#3b82f6',
      trend: '+12%'
    },
    {
      title: 'Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <FiDollarSign />,
      color: '#10b981',
      trend: '+8%'
    },
    {
      title: 'Avg. Price',
      value: `$${averagePrice.toFixed(2)}`,
      icon: <FiTrendingUp />,
      color: '#f59e0b',
      trend: '+5%'
    },
    {
      title: 'Top Category',
      value: topCategory,
      icon: <FiUsers />,
      color: '#8b5cf6',
      trend: '+15%'
    }
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Monitor your business performance and key metrics</p>
      </div>

      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Sales Trends</h3>
          <SalesChart products={products} />
        </div>
        
        <div className="chart-card">
          <h3>Category Distribution</h3>
          <CategoryChart products={products} />
        </div>
      </div>

      <div className="recent-section">
        <RecentProducts products={products} />
      </div>
    </div>
  )
}

export default Dashboard