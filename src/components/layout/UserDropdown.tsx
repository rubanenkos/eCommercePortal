import { useState, useRef, useEffect } from 'react'

export interface UserDropdownUser {
  name: string
  avatar: string
  email?: string
}

export interface UserDropdownItem {
  label?: string
  href?: string
  onClick?: () => void
  divider?: boolean
}

export interface UserDropdownProps {
  user: UserDropdownUser
  menuItems?: UserDropdownItem[]
}

export function UserDropdown({ user, menuItems = [] }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User menu"
        className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-gray-600 transition-all duration-200"
      >
        <img
          src={user.avatar}
          alt=""
          className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-700"
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 py-1 bg-gray-800 border border-gray-700 rounded-xl shadow-xl opacity-0 animate-[fadeSlideIn_0.2s_ease-out_forwards]"
          role="menu"
        >
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            {user.email && (
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            )}
          </div>
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.divider ? (
                <div
                  className="my-1 border-t border-gray-700"
                  role="separator"
                />
              ) : item.href ? (
                <a
                  href={item.href}
                  role="menuitem"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    item.onClick?.()
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
