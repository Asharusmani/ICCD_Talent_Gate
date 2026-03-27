import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApplyProjectProps {
  applyProjectData: Record<string, any>;
}

const initialState: ApplyProjectProps = {
  applyProjectData: {},
};

const applyProjectSlice = createSlice({
  name: 'applyProject',
  initialState,
  reducers: {
    setProjectData: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.applyProjectData = {
        ...state.applyProjectData,
        ...action.payload,
      };
    },
    reset: (state) => {
      state.applyProjectData = {};
    },
  },
});

export const { setProjectData, reset } = applyProjectSlice.actions;
export default applyProjectSlice.reducer;
