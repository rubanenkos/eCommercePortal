import { useState, useEffect } from 'react'
import { UserDropdown } from './UserDropdown'
import { MobileMenu } from './MobileMenu'

export interface NavItem {
  label: string
  href: string
}

export interface NavbarUser {
  name: string
  avatar: string
  email?: string
}

export interface NavbarDropdownItem {
  label?: string
  href?: string
  onClick?: () => void
  divider?: boolean
}

export interface NavbarProps {
  /** Logo text or image URL */
  logo: React.ReactNode
  /** Navigation menu items */
  menuItems: NavItem[]
  /** Currently active link href for highlighting */
  activeLink?: string
  /** Search placeholder text */
  searchPlaceholder?: string
  /** Callback when search is submitted */
  onSearch?: (query: string) => void
  /** User info for profile dropdown */
  user?: NavbarUser
  /** Dropdown menu items for user profile */
  userMenuItems?: NavbarDropdownItem[]
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

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className="w-6 h-6 transition-transform duration-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {isOpen ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  )
}

export function Navbar({
  logo,
  menuItems,
  activeLink,
  searchPlaceholder = 'Search...',
  onSearch,
  user,
  userMenuItems = [],
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 transition-shadow duration-300"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="flex items-center text-xl font-bold text-white hover:text-gray-200 transition-colors duration-200"
            >
              {logo}
            </a>
          </div>

          {/* Desktop menu items */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {menuItems.map((item) => {
              const isActive = activeLink !== undefined && item.href === activeLink
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          {/* Search bar - desktop */}
          {onSearch && (
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex flex-1 max-w-md mx-8"
            >
              <div className="relative w-full">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label="Search"
                  className="w-full pl-4 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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

          {/* User dropdown - desktop */}
          {user && (
            <div className="hidden md:block">
              <UserDropdown user={user} menuItems={userMenuItems} />
            </div>
          )}

          {/* Hamburger button - mobile */}
          <div className="flex md:hidden items-center gap-2">
            {onSearch && (
              <button
                type="button"
                aria-label="Search"
                className="p-2 text-gray-400 hover:text-white lg:hidden"
                onClick={() => onSearch?.(searchQuery)}
              >
                <SearchIcon />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
            >
              <HamburgerIcon isOpen={isMobileMenuOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuItems}
        activeLink={activeLink}
        searchPlaceholder={searchPlaceholder}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearch={onSearch}
        user={user}
      />
    </nav>
  )
}
