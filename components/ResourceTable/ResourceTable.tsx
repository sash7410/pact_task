'use client';

import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnSort,
} from '@tanstack/react-table';
import { ResourceWrapper } from '@/types/resource-types';
import { columns } from './columns';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatDateTime, formatRelativeTime } from '@/lib/utils/date';

interface Props {
  data: ResourceWrapper[];
}

export function ResourceTable({ data }: Props) {
  const [selected, setSelected] = useState<ResourceWrapper | null>(null);
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* Card container */}
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold">EHR Resources</h2>
          <Input
            placeholder="Search all columns..."
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="overflow-x-auto rounded-lg">
          <Table className="min-w-full text-sm">
            <TableHeader className="bg-zinc-50 dark:bg-zinc-800 sticky top-0 z-10">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={
                        'px-4 py-3 font-bold text-zinc-700 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-800 ' +
                        (header.column.getCanSort() ? 'cursor-pointer select-none hover:text-blue-600' : '')
                      }
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' ▲',
                        desc: ' ▼',
                      }[header.column.getIsSorted() as string] ?? null}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  onClick={() => setSelected(row.original)}
                  className={
                    'transition-colors cursor-pointer ' +
                    (idx % 2 === 0
                      ? 'bg-white dark:bg-zinc-900'
                      : 'bg-zinc-50 dark:bg-zinc-800') +
                    ' hover:bg-blue-50 dark:hover:bg-zinc-700'
                  }
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {table.getRowModel().rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} className="py-6 text-center text-zinc-400">
                    No resources found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2">
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="mr-2"
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                      >
                        Next
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                      </span>
                      <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => table.setPageSize(Number(e.target.value))}
                        className="ml-2 rounded border px-2 py-1 text-xs"
                      >
                        {[5, 10, 20].map(size => (
                          <option key={size} value={size}>
                            Show {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={Boolean(selected)} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <DialogTitle className="mb-2 text-lg font-bold">Resource Details</DialogTitle>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">Resource Type</div>
                  <div className="font-medium">{selected.resource.metadata.resourceType}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Created Time</div>
                  <div>{formatDateTime(selected.resource.metadata.createdTime)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Fetched</div>
                  <div>{formatRelativeTime(selected.resource.metadata.fetchTime)}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">State</div>
                  <div>{selected.resource.metadata.state}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">Human Readable Content</div>
                <div className="mt-1 whitespace-pre-wrap">{selected.resource.humanReadableStr}</div>
              </div>
              {selected.resource.aiSummary && (
                <div>
                  <div className="text-xs text-zinc-500">AI Summary</div>
                  <div className="mt-1 italic text-zinc-700 dark:text-zinc-300">{selected.resource.aiSummary}</div>
                </div>
              )}
            </div>
          )}
          <DialogClose asChild>
            <Button className="mt-6 w-full" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
} 