export const formatDate = (stringDate: string): string => {
  const date: Date = new Date(stringDate);

  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en', { month: 'short' });
  const formattedMonth: string = formatter.format(date);

  const hours: string = String(date.getHours()).padStart(2, '0');
  const minutes: string = String(date.getMinutes()).padStart(2, '0');
  const day: string = String(date.getDate()).padStart(2, '0');
  const year: string = String(date.getFullYear());

  return `${hours}:${minutes} ${day} ${formattedMonth} ${year}`;
};
