'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { ResourceWrapper } from '../../types/resource';
import { formatDateTime, formatRelativeTime } from '../../lib/utils/date';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<ResourceWrapper>[] = [
  {
    accessorFn: (row) => row.resource.metadata.resourceType,
    id: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-0 hover:bg-transparent"
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorFn: (row) => row.resource.metadata.createdTime,
    id: 'created',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-0 hover:bg-transparent"
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => formatDateTime(row.original.resource.metadata.createdTime),
    enableSorting: true,
  },
  {
    accessorFn: (row) => row.resource.metadata.fetchTime,
    id: 'fetched',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="px-0 hover:bg-transparent"
        >
          Fetched
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => formatRelativeTime(row.original.resource.metadata.fetchTime),
    enableSorting: true,
  },
]; 