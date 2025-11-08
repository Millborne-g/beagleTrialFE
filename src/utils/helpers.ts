// Utility functions for the Weather Radar Display

/**
 * Format timestamp to human-readable string
 */
export function formatTimestamp(timestamp: string | undefined): string {
  if (!timestamp) return 'N/A';
  
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Calculate time ago from timestamp
 */
export function timeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins === 1) return '1 minute ago';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

/**
 * Get reflectivity color based on dBZ value
 */
export function getReflectivityColor(dbz: number): string {
  if (dbz < 5) return 'transparent';
  if (dbz < 10) return '#04e9e7';
  if (dbz < 20) return '#019ff4';
  if (dbz < 30) return '#0300f4';
  if (dbz < 40) return '#02fd02';
  if (dbz < 45) return '#01c501';
  if (dbz < 50) return '#008e00';
  if (dbz < 55) return '#fdf802';
  if (dbz < 60) return '#e5bc00';
  if (dbz < 65) return '#fd9500';
  if (dbz < 70) return '#fd0000';
  return '#d40000';
}

/**
 * Get reflectivity intensity label
 */
export function getReflectivityLabel(dbz: number): string {
  if (dbz < 5) return 'No Precipitation';
  if (dbz < 20) return 'Very Light';
  if (dbz < 30) return 'Light';
  if (dbz < 40) return 'Moderate';
  if (dbz < 50) return 'Heavy';
  if (dbz < 60) return 'Very Heavy';
  if (dbz < 70) return 'Intense';
  return 'Extreme';
}

/**
 * Validate timestamp format
 */
export function isValidTimestamp(timestamp: string): boolean {
  const date = new Date(timestamp);
  return !isNaN(date.getTime());
}

/**
 * Check if data is stale (older than threshold)
 */
export function isDataStale(timestamp: string, thresholdMinutes: number = 5): boolean {
  const now = new Date();
  const dataTime = new Date(timestamp);
  const diffMs = now.getTime() - dataTime.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  return diffMins > thresholdMinutes;
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

