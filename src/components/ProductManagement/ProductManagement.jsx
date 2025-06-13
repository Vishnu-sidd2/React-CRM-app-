import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, deleteProduct } from '../../store/slices/productSlice'
import ProductModal from './ProductModal'
import ProductFilters from './ProductFilters'
import ProductGrid from './ProductGrid'
import { FiPlus, FiGrid, FiList } from 'react-icons/fi'
import toast from 'react-hot-toast'
import './ProductManagement.css'

const ProductManagement = () => {
  const dispatch = useDispatch()
  const { products, loading } = useSelector((state) => state.products)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [viewMode, setViewMode] = useState('grid')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    // Only fetch products if the array is empty to avoid unnecessary fetches
    if (products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products.length])

  useEffect(() => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase(); // Optimize: convert search term once
      filtered = filtered.filter(product => {
        
        const titleExists = product && typeof product.title === 'string';
        const brandExists = product && typeof product.brand === 'string';

        const titleMatches = titleExists && product.title.toLowerCase().includes(lowerCaseSearchTerm);
        const brandMatches = brandExists && product.brand.toLowerCase().includes(lowerCaseSearchTerm);

        return titleMatches || brandMatches;
      });
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory]) // Depend on products, searchTerm, selectedCategory

  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deleteProduct(productId)).unwrap()
        toast.success('Product deleted successfully')
      } catch (error) {
        toast.error('Failed to delete product')
      }
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  //  products array is not empty before mapping categories
  const categories = products.length > 0 ? [...new Set(products.map(p => p.category))] : [];

  if (loading && products.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    )
  }

  return (
    <div className="product-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Product Management</h1>
          <p>Manage your product inventory and details</p>
        </div>
        <button className="add-product-btn" onClick={handleAddProduct}>
          <FiPlus />
          Add Product
        </button>
      </div>

      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <div className="products-container">
        <div className="products-header">
          <span className="products-count">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </span>
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FiList />
            </button>
          </div>
        </div>

        {/* Conditionally render ProductGrid or ProductList based on viewMode */}
        {viewMode === 'grid' ? (
          <ProductGrid
            products={filteredProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ) : (
          <p>List view coming soon or not implemented yet.</p> 
        )}
      </div>

      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={handleModalClose}
        />
      )}
    </div>
  )
}

export default ProductManagement