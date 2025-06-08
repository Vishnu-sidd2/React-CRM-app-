import './StatsCard.css'

const StatsCard = ({ title, value, icon, color, trend }) => {
  return (
    <div className="stats-card">
      <div className="stats-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stats-content">
        <h3>{title}</h3>
        <div className="stats-value">{value}</div>
        <div className="stats-trend" style={{ color: color }}>
          {trend} from last month
        </div>
      </div>
    </div>
  )
}

export default StatsCard