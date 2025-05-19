import { format, formatDistanceToNow } from 'date-fns';

export function formatDateTime(iso: string): string {
  return format(new Date(iso), 'PPP p');
}

export function formatRelativeTime(iso: string): string {
  return formatDistanceToNow(new Date(iso), { addSuffix: true });
} 