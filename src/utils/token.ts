type strOrnull = string | null;

export const clearLocalStorage = (): void => {
  localStorage.clear();
};

export const setItem = (key: string, value: string): void => {
  console.log("insider key value", key, value);
  localStorage.setItem(key, value);
};
export const getItem = (key: string): strOrnull => {
  return localStorage.getItem(key);
};

export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};
