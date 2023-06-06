export const isValidEmail = (email: string): boolean => {
  const emailRegex: RegExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
};
