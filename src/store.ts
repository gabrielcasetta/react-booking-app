import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from './store/bookingsSlice';
import propertiesReducer from './store/propertiesSlice';

export const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
    properties: propertiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
