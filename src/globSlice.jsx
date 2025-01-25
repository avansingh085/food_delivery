// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
   isLogin:false,
   User:{},
   cart:[],
  },
  reducers: {
    setLogin: (state,action) => {
      state.isLogin=action.payload;
    },
    setUser:(state,action)=>{
        state.User=action.payload;
    },
    setCartItem:(state,action)=>{
        state.cart=action.payload;
    }
   
  },
});

export const { setLogin,setUser ,setCartItem} = counterSlice.actions;

export default counterSlice.reducer;
