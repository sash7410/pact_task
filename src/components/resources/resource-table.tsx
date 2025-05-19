'use client';

import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { ResourceWrapper } from '../../types/resource';
import { formatDateTime } from '../../lib/utils/date';
import { columns } from './columns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Info
} from 'lucide-react';

interface ResourceTableProps {
  data: ResourceWrapper[];
}

export function ResourceTable({ data }: ResourceTableProps) {
  const [selected, setSelected] = useState<ResourceWrapper | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      pagination,
      sorting,
      globalFilter,
    },
  });

  return (
    <div className="w-full text-gray-300 bg-black">
      <div className="flex items-center py-4 px-4 sm:px-0">
        <Input
          placeholder="Filter resources..."
          value={(table.getState().globalFilter as string) ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm bg-gray-900 border-gray-700 text-gray-300 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="rounded-lg border border-gray-700 shadow-lg bg-black overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-700 bg-gray-700 hover:bg-gray-600 transition-colors">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-12 px-2 sm:px-4 text-left align-middle font-semibold text-gray-300 whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-gray-700 cursor-pointer hover:bg-gray-700/60 transition-colors"
                  onClick={() => setSelected(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2 sm:p-4 align-middle text-gray-300 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-40 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center gap-3 py-8">
                    <Info className="h-10 w-10 text-gray-600" />
                    <p className="text-lg font-semibold text-gray-400">No resources found</p>
                    <p className="text-sm text-gray-500">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end space-y-4 sm:space-y-0 sm:space-x-4 py-6 px-4 sm:px-0">
        <div className="flex-1 text-sm text-gray-400 text-center sm:text-left">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-{
            Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )
          } / {table.getFilteredRowModel().rows.length} results
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent
          className="sm:max-w-[600px] max-h-[80vh] flex flex-col p-4 sm:p-6 bg-gray-900 text-gray-300 border border-gray-700"
        >
          <DialogHeader>
            <DialogTitle>Resource Details</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-grow pr-4">
            {selected && (
              <div className="space-y-4 sm:space-y-6 py-4 text-gray-300">
                <ScrollArea className="flex-grow pr-4">
                  {selected && (
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Type</h3>
                        <p className="mt-1 text-gray-300 break-words">{selected.resource.metadata.resourceType}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Created</h3>
                        <p className="mt-1 text-gray-300 break-words">{formatDateTime(selected.resource.metadata.createdTime)}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Fetched</h3>
                        <p className="mt-1 text-gray-300 break-words">{selected.resource.metadata.fetchTime}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">State</h3>
                        <p className="mt-1 text-gray-300 break-words">{selected.resource.metadata.state}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Content</h3>
                        <div className="mt-2 p-3 sm:p-4 bg-gray-800 rounded-md overflow-auto max-h-40 border border-gray-700">
                          <p className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed break-words">{selected.resource.humanReadableStr}</p>
                        </div>
                      </div>
                      {selected.resource.aiSummary && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-400">AI Summary</h3>
                          <div className="mt-2 p-3 sm:p-4 bg-gray-800 rounded-md overflow-auto max-h-40 border border-gray-700">
                            <p className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed break-words">{selected.resource.aiSummary}</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </ScrollArea>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
} 