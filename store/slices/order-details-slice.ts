import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderDetailProps {
  order: Record<string, any>;
}

const initialState: OrderDetailProps = {
  order: {},
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.order = {
        ...state.order,
        ...action.payload,
      };
    },
    resetOrder: (state) => {
      state.order = {};
    },
  },
});

export const { setOrder, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
