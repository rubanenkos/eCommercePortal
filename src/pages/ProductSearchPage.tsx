import { useState, useMemo } from 'react'
import { ProductCard, Navbar } from '../components'

export interface Product {
  id: string
  title: string
  description: string
  category: string
  price: number
  image: string
  rating: number
  reviewCount: number
  originalPrice?: number
  isOutOfStock?: boolean
}

const PRODUCTS: Product[] = [
  { id: '1', title: 'Minimalist Wireless Headphones', description: 'Premium sound quality with noise cancellation.', category: 'Electronics', price: 149.99, originalPrice: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', rating: 4.5, reviewCount: 128 },
  { id: '2', title: 'Classic Analog Watch', description: 'Timeless design with leather strap.', category: 'Accessories', price: 89, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', rating: 4.8, reviewCount: 256 },
  { id: '3', title: 'Organic Cotton T-Shirt', description: 'Soft, sustainable fabric.', category: 'Clothing', price: 34.99, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', rating: 4.2, reviewCount: 89 },
  { id: '4', title: 'Leather Crossbody Bag', description: 'Handcrafted genuine leather.', category: 'Accessories', price: 129, originalPrice: 159, image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400', rating: 4.6, reviewCount: 42 },
  { id: '5', title: 'Running Sneakers Pro', description: 'Lightweight performance shoes.', category: 'Footwear', price: 179.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', rating: 4.9, reviewCount: 312 },
  { id: '6', title: 'Limited Edition Sunglasses', description: 'UV400 protection. Polarized lenses.', category: 'Accessories', price: 79, image: 'https://images.unsplash.com/photo-1525904097878-94fb15835963?w=400', rating: 4, reviewCount: 18, isOutOfStock: true },
  { id: '7', title: 'Wireless Bluetooth Speaker', description: 'Portable 360° sound.', category: 'Electronics', price: 59.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', rating: 4.3, reviewCount: 67 },
  { id: '8', title: 'Yoga Mat Premium', description: 'Non-slip eco-friendly material.', category: 'Sports', price: 44.99, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', rating: 4.7, reviewCount: 203 },
  { id: '9', title: 'Stainless Steel Water Bottle', description: 'Insulated 32oz keeps cold 24h.', category: 'Accessories', price: 29.99, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400', rating: 4.6, reviewCount: 512 },
  { id: '10', title: 'Mechanical Keyboard RGB', description: 'Cherry MX switches.', category: 'Electronics', price: 129.99, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400', rating: 4.8, reviewCount: 189 },
  { id: '11', title: 'Denim Jacket Classic', description: 'Vintage wash, durable.', category: 'Clothing', price: 79.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', rating: 4.4, reviewCount: 94 },
  { id: '12', title: 'Hiking Boots Waterproof', description: 'Gore-Tex lining.', category: 'Footwear', price: 159.99, image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7368?w=400', rating: 4.7, reviewCount: 156 },
]

const CATEGORIES = ['All', 'Electronics', 'Accessories', 'Clothing', 'Footwear', 'Sports']
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
  { value: 'newest', label: 'Newest' },
]

const ITEMS_PER_PAGE = 6

export function ProductSearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('relevance')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchError, setSearchError] = useState<string | null>(null)

  const filteredAndSorted = useMemo(() => {
    let result = [...PRODUCTS]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    if (categoryFilter !== 'All') {
      result = result.filter((p) => p.category === categoryFilter)
    }

    const min = minPrice ? parseFloat(minPrice) : 0
    const max = maxPrice ? parseFloat(maxPrice) : Infinity
    if (!Number.isNaN(min) || !Number.isNaN(max)) {
      result = result.filter((p) => p.price >= min && p.price <= max)
    }

    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.reverse()
        break
      default:
        break
    }

    return result
  }, [searchQuery, categoryFilter, minPrice, maxPrice, sortBy])

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE) || 1
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredAndSorted.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredAndSorted, currentPage])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim().length > 100) {
      setSearchError('Search query is too long')
      return
    }
    setSearchError(null)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setCategoryFilter('All')
    setMinPrice('')
    setMaxPrice('')
    setSortBy('relevance')
    setCurrentPage(1)
    setSearchError(null)
  }

  const hasActiveFilters = searchQuery || categoryFilter !== 'All' || minPrice || maxPrice

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar
        logo={<span className="text-blue-400">Portal</span>}
        menuItems={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Categories', href: '#categories' },
        ]}
        activeLink="/products"
        searchPlaceholder="Search products..."
        onSearch={(q) => {
          setSearchQuery(q)
          setCurrentPage(1)
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="product-search-page">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">Product Search</h1>

        <form onSubmit={handleSearch} className="mb-6" data-testid="search-form">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="product-search" className="sr-only">Search products</label>
              <input
                id="product-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, description, or category..."
                aria-label="Search products"
                data-testid="product-search-input"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" data-testid="search-submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div>
          {searchError && (
            <p role="alert" data-testid="search-error" className="mt-2 text-sm text-red-400">
              {searchError}
            </p>
          )}
        </form>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 shrink-0 space-y-4" data-testid="filters-sidebar">
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1) }}
                aria-label="Filter by category"
                data-testid="category-filter"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1) }}
                  min="0"
                  step="0.01"
                  aria-label="Minimum price"
                  data-testid="price-min"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1) }}
                  min="0"
                  step="0.01"
                  aria-label="Maximum price"
                  data-testid="price-max"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                />
              </div>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                data-testid="clear-filters"
                className="w-full px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg hover:bg-gray-800"
              >
                Clear all filters
              </button>
            )}
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <p className="text-gray-400" data-testid="results-count">
                {filteredAndSorted.length} {filteredAndSorted.length === 1 ? 'result' : 'results'}
              </p>
              <div>
                <label htmlFor="sort-select" className="sr-only">Sort by</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1) }}
                  aria-label="Sort by"
                  data-testid="sort-select"
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {filteredAndSorted.length === 0 ? (
              <div data-testid="empty-results" className="rounded-xl border border-gray-800 bg-gray-900/50 p-12 text-center">
                <p className="text-xl text-gray-300 mb-2">No products found</p>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  data-testid="empty-clear-filters"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="product-grid">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      image={product.image}
                      title={product.title}
                      description={product.description}
                      price={`$${product.price.toFixed(2)}`}
                      originalPrice={product.originalPrice ? `$${product.originalPrice.toFixed(2)}` : undefined}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      isOutOfStock={product.isOutOfStock}
                      onAddToCart={() => {}}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav className="mt-8 flex justify-center gap-2" data-testid="pagination" aria-label="Pagination">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                      data-testid="pagination-prev"
                      className="px-4 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                    >
                      Previous
                    </button>
                    <span className="flex items-center px-4 text-gray-400" data-testid="pagination-info">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                      data-testid="pagination-next"
                      className="px-4 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                    >
                      Next
                    </button>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
