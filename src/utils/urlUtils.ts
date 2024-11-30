export const isValidUrl = (url: string): boolean => {
  try {
    const urlObject = new URL(url);
    return urlObject.protocol === 'http:' || urlObject.protocol === 'https:';
  } catch {
    return false;
  }
};

export const normalizeUrl = (url: string): string => {
  try {
    const urlObject = new URL(url);
    return urlObject.toString();
  } catch {
    // If it's not a valid URL, try prepending https://
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  }
};