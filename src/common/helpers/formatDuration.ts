export const formatDuration = (minutes: number): string => {
  const hours: number = Math.floor(minutes / 60);
  const remainingMinutes: number = minutes % 60;

  return `${hours}h ${remainingMinutes}min`;
};
