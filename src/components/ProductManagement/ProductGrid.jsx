import ProductCard from './ProductCard'
import ProductListItem from './ProductListItem'
import './ProductGrid.css'

const ProductGrid = ({ products, viewMode, onEdit, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h3>No products found</h3>
        <p>Try adjusting your search or filters, or add a new product.</p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="product-list">
        <div className="list-header">
          <div className="col">Image</div>
          <div className="col">Product</div>
          <div className="col">Category</div>
          <div className="col">Price</div>
          <div className="col">Stock</div>
          <div className="col">Actions</div>
        </div>
        {products.map(product => (
          <ProductListItem
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default ProductGrid