const secret = 's3cr3t';

export const encrypt = (text: string) => {
  return btoa(unescape(encodeURIComponent(text + secret)));
};

export const decrypt = (encoded: string) => {
  try {
    const decoded = decodeURIComponent(escape(atob(encoded)));
    return decoded.replace(secret, '');
  } catch (err) {
    return '';
  }
};
