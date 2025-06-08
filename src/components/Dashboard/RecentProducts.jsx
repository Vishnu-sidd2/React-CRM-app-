import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi'
import './RecentProducts.css'

const RecentProducts = ({ products }) => {
  const recentProducts = products.slice(0, 5)

  if (recentProducts.length === 0) {
    return (
      <div className="recent-products">
        <h3>Recent Products</h3>
        <div className="empty-state">
          <p>No products available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="recent-products">
      <div className="section-header">
        <h3>Recent Products</h3>
        <span className="product-count">{products.length} total products</span>
      </div>
      
      <div className="products-table">
        <div className="table-header">
          <div className="th">Image</div>
          <div className="th">Product</div>
          <div className="th">Category</div>
          <div className="th">Price</div>
          <div className="th">Stock</div>
          <div className="th">Actions</div>
        </div>
        
        <div className="table-body">
          {recentProducts.map((product) => (
            <div key={product.id} className="table-row">
              <div className="td">
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="product-image"
                />
              </div>
              <div className="td">
                <div className="product-info">
                  <span className="product-title">{product.title}</span>
                  <span className="product-brand">{product.brand}</span>
                </div>
              </div>
              <div className="td">
                <span className="category-badge">{product.category}</span>
              </div>
              <div className="td">
                <span className="price">${product.price}</span>
              </div>
              <div className="td">
                <span className={`stock ${product.stock < 10 ? 'low' : ''}`}>
                  {product.stock}
                </span>
              </div>
              <div className="td">
                <div className="actions">
                  <button className="action-btn view">
                    <FiEye />
                  </button>
                  <button className="action-btn edit">
                    <FiEdit />
                  </button>
                  <button className="action-btn delete">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentProducts