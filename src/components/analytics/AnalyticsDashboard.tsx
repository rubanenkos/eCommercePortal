import { useState, useEffect } from 'react'
import { KPICard } from './KPICard'
import { MockLineChart } from './MockLineChart'
import { MockBarChart } from './MockBarChart'
import { MockPieChart } from './MockPieChart'
import { DataTable } from './DataTable'
import { FilterControls } from './FilterControls'
import { DateRangeSelector } from './DateRangeSelector'
import { LoadingSkeleton } from './LoadingSkeleton'
import { DarkModeToggle } from '../Dashboard/DarkModeToggle'

function RevenueIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function OrdersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  )
}

function ConversionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  )
}

interface TrafficRow extends Record<string, unknown> {
  source: string
  visitors: number
  conversions: number
  rate: string
  region?: string
  channel?: string
}

const ALL_TABLE_DATA: TrafficRow[] = [
  { source: 'Organic Search', visitors: 4521, conversions: 312, rate: '6.9%', region: 'us', channel: 'web' },
  { source: 'Direct', visitors: 3204, conversions: 289, rate: '9.0%', region: 'us', channel: 'web' },
  { source: 'Social Media', visitors: 1892, conversions: 98, rate: '5.2%', region: 'eu', channel: 'mobile' },
  { source: 'Email', visitors: 1245, conversions: 156, rate: '12.5%', region: 'us', channel: 'web' },
  { source: 'Referral', visitors: 892, conversions: 67, rate: '7.5%', region: 'apac', channel: 'api' },
  { source: 'Paid Search', visitors: 2103, conversions: 189, rate: '9.0%', region: 'eu', channel: 'web' },
  { source: 'Display Ads', visitors: 756, conversions: 34, rate: '4.5%', region: 'apac', channel: 'mobile' },
  { source: 'Affiliates', visitors: 534, conversions: 42, rate: '7.9%', region: 'us', channel: 'api' },
  { source: 'App Store', visitors: 1203, conversions: 89, rate: '7.4%', region: 'eu', channel: 'mobile' },
]

const FILTER_CONFIG = [
  {
    id: 'region',
    label: 'Region',
    options: [
      { value: 'all', label: 'All regions' },
      { value: 'us', label: 'United States' },
      { value: 'eu', label: 'Europe' },
      { value: 'apac', label: 'APAC' },
    ],
  },
  {
    id: 'channel',
    label: 'Channel',
    options: [
      { value: 'all', label: 'All channels' },
      { value: 'web', label: 'Web' },
      { value: 'mobile', label: 'Mobile' },
      { value: 'api', label: 'API' },
    ],
  },
]

function filterData(
  data: TrafficRow[],
  region: string,
  channel: string
): TrafficRow[] {
  return data.filter((row) => {
    const matchRegion = region === 'all' || row.region === region
    const matchChannel = channel === 'all' || row.channel === channel
    return matchRegion && matchChannel
  })
}

function getFilteredKPIs(
  region: string,
  channel: string
): { revenue: string; users: string; orders: string; conversion: string } {
  const filtered = filterData(ALL_TABLE_DATA, region, channel)
  const totalVisitors = filtered.reduce((s, r) => s + r.visitors, 0)
  const totalConversions = filtered.reduce((s, r) => s + r.conversions, 0)

  const regionMult: Record<string, number> = {
    all: 1,
    us: 1.15,
    eu: 0.92,
    apac: 0.78,
  }
  const channelMult: Record<string, number> = {
    all: 1,
    web: 1.05,
    mobile: 0.88,
    api: 0.65,
  }
  const rMult = regionMult[region] ?? 1
  const cMult = channelMult[channel] ?? 1

  const revenue = Math.round(124580 * rMult * cMult)
  const orders = Math.round(1847 * rMult * cMult)

  return {
    revenue: `$${revenue.toLocaleString()}`,
    users: totalVisitors.toLocaleString(),
    orders: orders.toLocaleString(),
    conversion: totalVisitors > 0
      ? `${((totalConversions / totalVisitors) * 100).toFixed(1)}%`
      : '0%',
  }
}

export function AnalyticsDashboard() {
  const [filters, setFilters] = useState<Record<string, string>>({
    region: 'all',
    channel: 'all',
  })
  const [dateRange, setDateRange] = useState('30d')
  const [isLoading, setIsLoading] = useState(true)

  const filteredTableData = filterData(
    ALL_TABLE_DATA,
    filters.region,
    filters.channel
  )

  const kpis = getFilteredKPIs(filters.region, filters.channel)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [filters, dateRange])

  const handleFilterChange = (id: string, value: string) => {
    setFilters((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Analytics Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Monitor your key metrics and performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters & Date Range */}
        <section className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <FilterControls
            filters={FILTER_CONFIG}
            values={filters}
            onChange={handleFilterChange}
          />
          <DateRangeSelector
            value={dateRange as '7d' | '30d' | '90d' | 'custom'}
            onChange={(preset) => setDateRange(preset)}
          />
        </section>

        {/* KPI Cards - Responsive grid */}
        <section
          className="mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          aria-label="Key performance indicators"
        >
          {isLoading ? (
            <>
              <LoadingSkeleton variant="card" />
              <LoadingSkeleton variant="card" />
              <LoadingSkeleton variant="card" />
              <LoadingSkeleton variant="card" />
            </>
          ) : (
            <>
              <KPICard
                title="Total Revenue"
                value={kpis.revenue}
                change="+12.5% vs last period"
                changeType="positive"
                icon={<RevenueIcon className="w-5 h-5" />}
              />
              <KPICard
                title="Active Users"
                value={kpis.users}
                change="+8.2% vs last period"
                changeType="positive"
                icon={<UsersIcon className="w-5 h-5" />}
              />
              <KPICard
                title="Orders"
                value={kpis.orders}
                change="-2.1% vs last period"
                changeType="negative"
                icon={<OrdersIcon className="w-5 h-5" />}
              />
              <KPICard
                title="Conversion Rate"
                value={kpis.conversion}
                change="+0.3% vs last period"
                changeType="positive"
                icon={<ConversionIcon className="w-5 h-5" />}
              />
            </>
          )}
        </section>

        {/* Charts - Responsive grid */}
        <section className="mb-6 sm:mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {isLoading ? (
            <>
              <LoadingSkeleton variant="chart" />
              <LoadingSkeleton variant="chart" />
            </>
          ) : (
            <>
              <MockLineChart title="Revenue Overview" height="h-64 sm:h-72" />
              <MockPieChart title="Traffic by Source" height="h-64 sm:h-72" />
            </>
          )}
        </section>

        <section className="mb-6 sm:mb-8">
          {isLoading ? (
            <LoadingSkeleton variant="chart" className="h-64" />
          ) : (
            <MockBarChart title="User Growth" height="h-56 sm:h-64" />
          )}
        </section>

        {/* Data Table */}
        <section>
          {isLoading ? (
            <LoadingSkeleton variant="table" />
          ) : (
            <DataTable
              title="Traffic Sources"
              columns={[
                { id: 'source', header: 'Source' },
                { id: 'visitors', header: 'Visitors' },
                { id: 'conversions', header: 'Conversions' },
                {
                  id: 'rate',
                  header: 'Conv. Rate',
                  cell: (row: TrafficRow) => (
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {row.rate}
                    </span>
                  ),
                },
              ]}
              data={filteredTableData}
            />
          )}
        </section>
      </main>
    </div>
  )
}
