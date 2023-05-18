export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedDuration = `${hours}h ${remainingMinutes}min`;
  return formattedDuration;
};
