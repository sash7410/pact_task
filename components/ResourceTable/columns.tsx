'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { ResourceWrapper } from '@/types/resource-types';
import { formatDateTime, formatRelativeTime } from '@/lib/utils/date';
import { ClientOnly } from '@/components/ClientOnly';

export const columns: ColumnDef<ResourceWrapper>[] = [
  {
    accessorKey: 'resource.metadata.resourceType',
    header: 'Resource Type',
    cell: info => info.getValue<string>(),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: 'resource.metadata.createdTime',
    header: 'Created Time',
    cell: info => (
      <ClientOnly>{formatDateTime(info.getValue<string>())}</ClientOnly>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'resource.metadata.fetchTime',
    header: 'Fetched',
    cell: info => (
      <ClientOnly>{formatRelativeTime(info.getValue<string>())}</ClientOnly>
    ),
    enableSorting: true,
  },
]; 