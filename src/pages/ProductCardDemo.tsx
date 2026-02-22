import { ProductCard } from '../components'

const SAMPLE_PRODUCTS = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    title: 'Minimalist Wireless Headphones',
    description: 'Premium sound quality with noise cancellation. Comfortable over-ear design for all-day use.',
    price: '$149.99',
    originalPrice: '$199.99',
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    title: 'Classic Analog Watch',
    description: 'Timeless design with leather strap. Water resistant up to 50m.',
    price: '$89.00',
    rating: 4.8,
    reviewCount: 256,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    title: 'Organic Cotton T-Shirt',
    description: 'Soft, sustainable fabric. Available in multiple colors. Perfect for everyday wear.',
    price: '$34.99',
    rating: 4.2,
    reviewCount: 89,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400',
    title: 'Leather Crossbody Bag',
    description: 'Handcrafted genuine leather. Compact yet spacious. Ideal for daily essentials.',
    price: '$129.00',
    originalPrice: '$159.00',
    rating: 4.6,
    reviewCount: 42,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    title: 'Running Sneakers Pro',
    description: 'Lightweight performance shoes. Responsive cushioning for runners.',
    price: '$179.99',
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1525904097878-94fb15835963?w=400',
    title: 'Limited Edition Sunglasses',
    description: 'Sold out. UV400 protection. Polarized lenses.',
    price: '$79.00',
    rating: 4.0,
    reviewCount: 18,
    isOutOfStock: true,
  },
]

export function ProductCardDemo() {
  return (
    <div className="min-h-screen bg-gray-950">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Product Catalog
          </h1>
          <p className="mt-2 text-gray-400 text-sm sm:text-base">
            E-commerce product cards with hover effects
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              originalPrice={product.originalPrice}
              rating={product.rating}
              reviewCount={product.reviewCount}
              isOutOfStock={product.isOutOfStock}
              onAddToCart={() =>
                alert(`Added "${product.title}" to cart!`)
              }
            />
          ))}
        </div>
      </main>
    </div>
  )
}
