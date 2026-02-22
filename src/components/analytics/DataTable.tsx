export interface DataTableColumn<T> {
  id: keyof T | string
  header: string
  cell?: (row: T) => React.ReactNode
}

export interface DataTableProps<T extends Record<string, unknown>> {
  /** Column definitions */
  columns: DataTableColumn<T>[]
  /** Data rows */
  data: T[]
  /** Optional table title */
  title?: string
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  title,
}: DataTableProps<T>) {
  return (
    <div
      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300"
      role="region"
      aria-label={title ?? 'Data table'}
    >
      {title && (
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              {columns.map((col) => (
                <th
                  key={String(col.id)}
                  scope="col"
                  className="px-5 py-3 text-left font-semibold text-gray-700 dark:text-gray-300"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No data to display
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  {columns.map((col) => {
                    const key = col.id as keyof T
                    const value = row[key]
                    return (
                      <td
                        key={String(col.id)}
                        className="px-5 py-3 text-gray-900 dark:text-gray-100"
                      >
                        {col.cell
                          ? col.cell(row)
                          : String(value ?? '—')}
                      </td>
                    )
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
