import { FiEdit, FiTrash2 } from 'react-icons/fi'
import './ProductListItem.css'

const ProductListItem = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-list-item">
      <div className="col">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="list-product-image"
        />
      </div>
      
      <div className="col">
        <div className="product-info">
          <span className="product-title">{product.title}</span>
          <span className="product-brand">{product.brand}</span>
        </div>
      </div>
      
      <div className="col">
        <span className="category-badge">{product.category}</span>
      </div>
      
      <div className="col">
        <span className="product-price">${product.price}</span>
      </div>
      
      <div className="col">
        <span className={`product-stock ${product.stock < 10 ? 'low' : ''}`}>
          {product.stock}
        </span>
      </div>
      
      <div className="col">
        <div className="list-actions">
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
  )
}

export default ProductListItem