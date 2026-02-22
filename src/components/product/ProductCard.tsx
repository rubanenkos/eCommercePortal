import { useId } from 'react'
import { Button } from '../ui/Button'

export interface ProductCardProps {
  /** URL for the product image */
  image: string
  /** Product title/name */
  title: string
  /** Product description (short) */
  description: string
  /** Current price in display format (e.g. "$29.99") */
  price: string
  /** Original price for sale display (e.g. "$39.99") - optional */
  originalPrice?: string
  /** Star rating from 0 to 5 */
  rating: number
  /** Number of reviews - optional */
  reviewCount?: number
  /** Callback when Add to Cart is clicked */
  onAddToCart?: () => void
  /** Whether the product is out of stock */
  isOutOfStock?: boolean
}

function StarRating({ rating, reviewCount }: { rating: number; reviewCount?: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-1.5">
      <div
        className="flex"
        role="img"
        aria-label={`Rating: ${rating} out of 5 stars${reviewCount ? ` (${reviewCount} reviews)` : ''}`}
      >
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} filled />
        ))}
        {hasHalfStar && <Star key="half" half />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} filled={false} />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-sm text-gray-500">({reviewCount})</span>
      )}
    </div>
  )
}

function Star({ filled, half }: { filled?: boolean; half?: boolean }) {
  const gradientId = useId()
  const starPath =
    'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'

  if (half) {
    return (
      <svg
        className="w-5 h-5 shrink-0 text-amber-400"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" stopOpacity={1} />
          </linearGradient>
        </defs>
        <path fill={`url(#${gradientId})`} d={starPath} />
      </svg>
    )
  }

  return (
    <svg
      className={`w-5 h-5 shrink-0 transition-colors ${
        filled ? 'text-amber-400' : 'text-gray-600'
      }`}
      viewBox="0 0 20 20"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path d={starPath} />
    </svg>
  )
}

export function ProductCard({
  image,
  title,
  description,
  price,
  originalPrice,
  rating,
  reviewCount,
  onAddToCart,
  isOutOfStock = false,
}: ProductCardProps) {
  return (
    <article
      className="group relative flex flex-col bg-gray-900 rounded-xl border border-gray-800 overflow-hidden transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/50 hover:-translate-y-1"
      aria-labelledby={`product-title-${title.replace(/\s+/g, '-')}`}
    >
      {/* Image container with hover zoom */}
      <div className="relative aspect-square overflow-hidden bg-gray-800">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {isOutOfStock && (
          <div
            className="absolute inset-0 bg-gray-950/70 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="px-4 py-2 bg-gray-800 text-gray-300 font-medium rounded-lg">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Rating */}
        <div className="mb-2">
          <StarRating rating={rating} reviewCount={reviewCount} />
        </div>

        {/* Title */}
        <h2
          id={`product-title-${title.replace(/\s+/g, '-')}`}
          className="text-lg font-semibold text-white line-clamp-2 mb-1"
        >
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-white">{price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart button */}
        <Button
          onClick={onAddToCart}
          disabled={isOutOfStock}
          aria-label={`Add ${title} to cart`}
          className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isOutOfStock ? 'Out of stock' : 'Add to Cart'}
        </Button>
      </div>
    </article>
  )
}
