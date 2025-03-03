// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
   isLogin:false,
   User:{},
   cart:[],
   Menu:[],
   deliveryLocation:{}
  },
  reducers: {
    setLogin: (state,action) => {
      state.isLogin=action.payload;
    },
    setUser:(state,action)=>{
        state.User=action.payload;
    },
    setCart:(state,action)=>{
        state.cart=action.payload;
    }
    ,
    setMenu:(state,action)=>{
      state.Menu=action.payload;
    }
    ,
    setDeliveryLocation:(state,action)=>{
      deliveryLocation=action.payload;
    }
   
  },
});

export const {setDeliveryLocation, setLogin,setUser ,setCart,setMenu} = counterSlice.actions;

export default counterSlice.reducer;
