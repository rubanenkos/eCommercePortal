import { useState } from 'react'
import { SettingsTabs } from './SettingsTabs'
import type { SettingsTabId } from './SettingsTabs'
import { ToggleSwitch } from './ToggleSwitch'
import {
  FormInput,
  FormSelect,
  FormTextarea,
} from './FormInput'
import { Button } from '../ui/Button'

const TABS = [
  { id: 'profile' as const, label: 'Profile' },
  { id: 'notifications' as const, label: 'Notifications' },
  { id: 'privacy' as const, label: 'Privacy' },
  { id: 'appearance' as const, label: 'Appearance' },
]

export interface SettingsPanelProps {
  /** Callback when settings are saved */
  onSave?: (data: Record<string, unknown>) => void
  /** Callback when cancel is clicked */
  onCancel?: () => void
}

export function SettingsPanel({ onSave, onCancel }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<SettingsTabId>('profile')
  const [hasChanges, setHasChanges] = useState(false)

  // Form state - validation placeholders
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  })
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showActivity: true,
  })
  const [appearance, setAppearance] = useState({
    theme: 'system',
    compactMode: false,
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const handleSave = () => {
    // Validation placeholder - extend with your validation rules
    const errors: Record<string, string> = {}
    if (activeTab === 'profile' && !profile.name.trim()) {
      errors.profileName = 'Name is required'
    }
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }
    setValidationErrors({})
    const data = { profile, notifications, privacy, appearance }
    onSave?.(data)
    setHasChanges(false)
  }

  const handleCancel = () => {
    onCancel?.()
    setHasChanges(false)
  }

  return (
    <div
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden"
      role="region"
      aria-labelledby="settings-heading"
    >
      <div className="border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
        <h2
          id="settings-heading"
          className="text-lg font-semibold text-gray-900 dark:text-white"
        >
          Settings
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account preferences
        </p>
      </div>

      <SettingsTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="p-4 sm:p-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div
            id="panel-profile"
            role="tabpanel"
            aria-labelledby="tab-profile"
            className="space-y-6"
          >
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                Personal Information
              </h3>
              <div className="space-y-4">
                <FormInput
                  label="Display Name"
                  placeholder="Enter your name"
                  value={profile.name}
                  error={validationErrors.profileName}
                  onChange={(e) => {
                    setProfile((p) => ({ ...p, name: e.target.value }))
                    setHasChanges(true)
                    if (validationErrors.profileName) {
                      setValidationErrors((prev) => ({ ...prev, profileName: '' }))
                    }
                  }}
                  hint="This name will be visible to other users"
                />
                <FormInput
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={profile.email}
                  onChange={(e) => {
                    setProfile((p) => ({ ...p, email: e.target.value }))
                    setHasChanges(true)
                  }}
                  hint="We'll never share your email"
                />
                <FormTextarea
                  label="Bio"
                  placeholder="Tell us about yourself"
                  value={profile.bio}
                  onChange={(e) => {
                    setProfile((p) => ({ ...p, bio: e.target.value }))
                    setHasChanges(true)
                  }}
                  rows={4}
                />
              </div>
            </section>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div
            id="panel-notifications"
            role="tabpanel"
            aria-labelledby="tab-notifications"
            className="space-y-6"
          >
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-6">
                <ToggleSwitch
                  label="Email notifications"
                  description="Receive updates and reminders via email"
                  checked={notifications.email}
                  onChange={(e) => {
                    setNotifications((n) => ({ ...n, email: e.target.checked }))
                    setHasChanges(true)
                  }}
                />
                <ToggleSwitch
                  label="Push notifications"
                  description="Get notified in your browser"
                  checked={notifications.push}
                  onChange={(e) => {
                    setNotifications((n) => ({ ...n, push: e.target.checked }))
                    setHasChanges(true)
                  }}
                />
                <ToggleSwitch
                  label="Marketing emails"
                  description="Receive tips, news, and special offers"
                  checked={notifications.marketing}
                  onChange={(e) => {
                    setNotifications((n) => ({ ...n, marketing: e.target.checked }))
                    setHasChanges(true)
                  }}
                />
              </div>
            </section>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div
            id="panel-privacy"
            role="tabpanel"
            aria-labelledby="tab-privacy"
            className="space-y-6"
          >
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                Profile Visibility
              </h3>
              <div className="space-y-4">
                <FormSelect
                  label="Who can see your profile"
                  options={[
                    { value: 'public', label: 'Everyone' },
                    { value: 'connections', label: 'Connections only' },
                    { value: 'private', label: 'Only me' },
                  ]}
                  value={privacy.profileVisibility}
                  onChange={(e) => {
                    setPrivacy((p) => ({
                      ...p,
                      profileVisibility: e.target.value,
                    }))
                    setHasChanges(true)
                  }}
                  hint="Control who can view your profile"
                />
                <ToggleSwitch
                  label="Show activity status"
                  description="Let others see when you're active"
                  checked={privacy.showActivity}
                  onChange={(e) => {
                    setPrivacy((p) => ({ ...p, showActivity: e.target.checked }))
                    setHasChanges(true)
                  }}
                />
              </div>
            </section>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div
            id="panel-appearance"
            role="tabpanel"
            aria-labelledby="tab-appearance"
            className="space-y-6"
          >
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                Theme
              </h3>
              <div className="space-y-4">
                <FormSelect
                  label="Color theme"
                  options={[
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'system', label: 'System' },
                  ]}
                  value={appearance.theme}
                  onChange={(e) => {
                    setAppearance((a) => ({ ...a, theme: e.target.value }))
                    setHasChanges(true)
                  }}
                  hint="Choose your preferred color scheme"
                />
                <ToggleSwitch
                  label="Compact mode"
                  description="Reduce spacing for a denser layout"
                  checked={appearance.compactMode}
                  onChange={(e) => {
                    setAppearance((a) => ({
                      ...a,
                      compactMode: e.target.checked,
                    }))
                    setHasChanges(true)
                  }}
                />
              </div>
            </section>
          </div>
        )}

        {/* Save/Cancel actions */}
        {hasChanges && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="w-full sm:w-auto"
            >
              Save changes
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
