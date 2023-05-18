export const formatDate = (stringDate: string) => {
  const date = new Date(stringDate);

  const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
  const formattedMonth = formatter.format(date);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day} ${formattedMonth} ${year}`;
};
