import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  user: [],
  shippingInfo: {},
  totalPrice: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addCartItem: (state, { payload }) => {
      // console.log(payload, "payloadId");
      // let ifItemExists = state.cartItems.find(
      //   (item) => item.product.id === payload.id
      // );
      // if (ifItemExists) {
      //   return;
      // }
      return {
        ...state,
        cartItems: [...state.cartItems, payload],
      };
    },
    totalAmount: (state, { payload }) => {
      console.log(payload, "totalriceeeeee");
      state.totalPrice = payload;
    },
    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload);
    },
    authUser: (state, { payload }) => {
      state.user.push(payload);
    },
    saveShippingInfo: (state, { payload }) => {
      state.shippingInfo = { ...payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
  },
});

export const {
  addCartItem,
  removeItem,
  authUser,
  saveShippingInfo,
  totalAmount,
} = counterSlice.actions;

export default counterSlice.reducer;

export const getCart = createAsyncThunk("/cart/get", async () => {
  let token = localStorage.getItem("userId");
  let res = await fetch(`http://localhost:3001/cart/updated/${token}`);
  let jData = await res.json();
  let product = jData.map((data) => data);
  return product;
});
