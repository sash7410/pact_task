import { format, formatDistanceToNow } from 'date-fns';

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  return format(date, 'PPP p'); // e.g., "May 11, 2025 9:14 PM"
}

export function formatRelativeTime(isoString: string): string {
  return formatDistanceToNow(new Date(isoString), { addSuffix: true }); // e.g., "3 hours ago"
} 