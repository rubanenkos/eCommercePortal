import { useEffect } from 'react'

export interface MobileMenuItem {
  label: string
  href: string
}

export interface MobileMenuUser {
  name: string
  avatar: string
  email?: string
}

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MobileMenuItem[]
  searchPlaceholder?: string
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  onSearch?: (query: string) => void
  user?: MobileMenuUser
}

function SearchIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
}

export function MobileMenu({
  isOpen,
  onClose,
  menuItems,
  searchPlaceholder = 'Search...',
  searchQuery,
  onSearchQueryChange,
  onSearch,
  user,
}: MobileMenuProps) {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 border-t border-gray-800 bg-gray-900/98 space-y-1">
          {onSearch && (
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label="Search"
                  className="w-full pl-4 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-white transition-colors"
                >
                  <SearchIcon />
                </button>
              </div>
            </form>
          )}
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
          {user && (
            <div className="pt-4 mt-4 border-t border-gray-800 flex items-center gap-3">
              <img
                src={user.avatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-white">{user.name}</p>
                {user.email && (
                  <p className="text-xs text-gray-400">{user.email}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
  )
}
