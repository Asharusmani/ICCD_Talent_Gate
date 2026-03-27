import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GigDetailProps {
  gig: Record<string, any>;
}

const initialState: GigDetailProps = {
  gig: {},
};

const gigSlice = createSlice({
  name: 'gig',
  initialState,
  reducers: {
    setGig: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.gig = {
        ...state.gig,
        ...action.payload,
      };
    },
    resetGig: (state) => {
      state.gig = {};
    },
  },
});

export const { setGig, resetGig } = gigSlice.actions;
export default gigSlice.reducer;
