import { createSlice } from "@reduxjs/toolkit";

interface OrderState {
  currentOrder:
    | null
    | Record<
        string,
        unknown
      >;
}

const initialState: OrderState =
  {
    currentOrder:
      null,
  };

const orderSlice =
  createSlice({
    name: "order",

    initialState,

    reducers: {
      setOrder: (
        state,
        action
      ) => {
        state.currentOrder =
          action.payload;
      },

      clearOrder: (
        state
      ) => {
        state.currentOrder =
          null;
      },
    },
  });

export const {
  setOrder,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;