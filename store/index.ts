import applyProjectReducer from '@/store/slices/apply-project-slice';
import profileReducer from '@/store/slices/freelancer-profile'
import orderReducer from '@/store/slices/order-details-slice'
import gigReducer from '@/store/slices/gig-detail-slice'
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    applyProject: applyProjectReducer,
    profile: profileReducer,
    order: orderReducer,
    gig: gigReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // useful for Expo / React Native
    }),
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
