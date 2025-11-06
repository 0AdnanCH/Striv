import React from 'react';
import { cn } from '../../utils/cn.util';

export interface BaseTableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}
 
export interface BaseTableProps<T> {
  data: T[];
  columns: BaseTableColumn<T>[];
  loading?: boolean;
  bordered?: boolean;
  striped?: boolean;
  theme?: {
    headerBg?: string;
    headerText?: string;
    rowHover?: string;
    border?: string;
    text?: string;
    bg?: string;
  };
  emptyMessage?: string;
}

export function BaseTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  bordered = false,
  striped = false,
  theme = {
    headerBg: 'bg-gray-100',
    headerText: 'text-gray-800',
    rowHover: 'hover:bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-700',
    bg: 'bg-white'
  },
  emptyMessage = 'No data available.',
}: BaseTableProps<T>) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-xl shadow-sm",
        bordered && `border ${theme.border}`,
        theme.bg
      )}
    >
      <table className="min-w-full border-collapse">
        {/* Table Header */}
        <thead>
          <tr className={cn(theme.headerBg, theme.headerText, "text-left text-sm uppercase font-semibold tracking-wide")}>
            {columns.map((col) => (
              <th key={String(col.key)} className={cn("px-4 py-3", bordered && `border-b ${theme.border}`, col.className)}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-6 text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  theme.text,
                  striped && rowIndex % 2 !== 0 && "bg-gray-50",
                  theme.rowHover,
                  "transition-colors"
                )}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={cn("px-4 py-3 text-sm", bordered && `border-b ${theme.border}`, col.className)}
                  >
                    {col.render ? col.render(row) : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BaseTable;