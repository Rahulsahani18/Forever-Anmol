// src/redux/customStorage.js
// Custom storage that works with redux-persist
const createCustomStorage = () => {
  return {
    getItem: async (key) => {
      try {
        const value = localStorage.getItem(key);
        return Promise.resolve(value);
      } catch (err) {
        console.error('Error getting item from localStorage:', err);
        return Promise.resolve(null);
      }
    },
    setItem: async (key, value) => {
      try {
        localStorage.setItem(key, value);
        return Promise.resolve();
      } catch (err) {
        console.error('Error setting item to localStorage:', err);
        return Promise.resolve();
      }
    },
    removeItem: async (key) => {
      try {
        localStorage.removeItem(key);
        return Promise.resolve();
      } catch (err) {
        console.error('Error removing item from localStorage:', err);
        return Promise.resolve();
      }
    },
  };
};

const customStorage = createCustomStorage();

export default customStorage;