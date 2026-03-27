import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileProps {
  profile: Record<string, any>;
}

const initialState: ProfileProps = {
  profile: {},
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },
    resetProfile: (state) => {
      state.profile = {};
    },
  },
});

export const { setProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
