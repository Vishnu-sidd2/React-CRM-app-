import { FiEdit, FiTrash2, FiStar } from 'react-icons/fi'
import './ProductCard.css'

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="product-image"
        />
        <div className="product-rating">
          <FiStar className="star-icon" />
          <span>{product.rating?.toFixed(1) || '0.0'}</span>
        </div>
      </div>
      
      <div className="product-content">
        <div className="product-header">
          <h3 className="product-title">{product.title}</h3>
          <span className="product-brand">{product.brand}</span>
        </div>
        
        <div className="product-category">
          <span className="category-badge">{product.category}</span>
        </div>
        
        <p className="product-description">
          {product.description?.length > 80 
            ? `${product.description.substring(0, 80)}...` 
            : product.description
          }
        </p>
        
        <div className="product-details">
          <div className="price-stock">
            <span className="product-price">${product.price}</span>
            <span className={`product-stock ${product.stock < 10 ? 'low' : ''}`}>
              Stock: {product.stock}
            </span>
          </div>
          
          <div className="product-actions">
            <button 
              className="action-btn edit"
              onClick={() => onEdit(product)}
              title="Edit Product"
            >
              <FiEdit />
            </button>
            <button 
              className="action-btn delete"
              onClick={() => onDelete(product.id)}
              title="Delete Product"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard