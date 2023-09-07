import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  user: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addCartItem: (state, { payload }) => {
      return {
        ...state,
        cartItems: [...state.cartItems, payload],
      };
    },
    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload);
    },
    authUser: (state, { payload }) => {
      state.user.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
  },
});

export const { addCartItem, removeItem, authUser } = counterSlice.actions;

export default counterSlice.reducer;

export const getCart = createAsyncThunk("/cart/get", async () => {
  let token = localStorage.getItem("userId");
  let res = await fetch(`http://localhost:3001/cart/${token}`);
  let jData = await res.json();
  let product = jData.map((data) => data);
  return product;
});
