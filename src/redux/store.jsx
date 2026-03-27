// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import packagesReducer from './slices/packagesSlice';
import customStorage from './customStorage'; // Import custom storage

const persistConfig = {
  key: 'packages',
  version: 1,
  storage: customStorage, // Use custom storage
  whitelist: ['categories', 'allPackages', 'lastFetched'],
  blacklist: ['loading', 'error', 'currentCategory', 'currentPackage'],
};

const persistedPackagesReducer = persistReducer(persistConfig, packagesReducer);

export const store = configureStore({
  reducer: {
    packages: persistedPackagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);