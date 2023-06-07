export const sort = (array: string[]): string[] => {
  array.sort((a, b) => a.localeCompare(b));
  return array;
};
