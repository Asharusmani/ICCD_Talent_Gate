export function formatDate(dateInput: string) {
  const date = new Date(dateInput);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const startMonth = new Intl.DateTimeFormat('en-US', options).format(date)
  return startMonth
// Output =  October 29, 2025
}

export function formatDateDay(timestamp) {
  const msgDate = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  if (isSameDay(msgDate, today)) return 'Today';
  if (isSameDay(msgDate, yesterday)) return 'Yesterday';

  return msgDate.toLocaleDateString(); // fallback: e.g., 7/22/2025
}

// Output = Today, yesterday

export function formatTo12HourTime(dateInput) {
  const date = new Date(dateInput);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  // fallback: e.g., 7:00 am
}
