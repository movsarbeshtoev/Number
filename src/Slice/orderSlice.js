import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = [...state.order, action.payload];
    },
    removeOrder: (state, action) => {
      state.order = state.order.filter(
        (obj, index) => index !== action.payload
      );
    },
  },
});
export const { removeOrder, setOrder } = orderSlice.actions;

export default orderSlice.reducer;
