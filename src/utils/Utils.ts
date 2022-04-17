const mailFormatRegEx = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

export const validateEmailFormat = (email: string) => {
  return email.match(mailFormatRegEx);
};
