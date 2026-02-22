export type SettingsTabId = 'profile' | 'notifications' | 'privacy' | 'appearance'

export interface SettingsTab {
  id: SettingsTabId
  label: string
}

export interface SettingsTabsProps {
  tabs: SettingsTab[]
  activeTab: SettingsTabId
  onTabChange: (tabId: SettingsTabId) => void
}

export function SettingsTabs({ tabs, activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Settings sections"
      className="flex flex-col sm:flex-row gap-1 border-b border-gray-200 dark:border-gray-700 overflow-x-auto"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`shrink-0 px-4 py-3 text-sm font-medium transition-colors rounded-t-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
              ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
