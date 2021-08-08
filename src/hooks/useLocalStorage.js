export const useLocalStorage = () => {
  const set = (key, value) => {
    if (typeof value === "object" || Array.isArray(value)) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  };
  const get = (key) => {
    return localStorage.getItem(key);
  };
  return {
    set,
    get,
  };
};
