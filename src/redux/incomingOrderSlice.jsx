import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/axiosInstance';



const initialState = {
   incomingOrder:[],
   
    
}
const incomingOrderSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
    
        updateIncomigOrder:(state,action)=>{
            state.incomingOrder=[...state.incomingOrder,action.payload];
        }
    },
});
export const { updateIncomigOrder } = incomingOrderSlice.actions;
export default incomingOrderSlice.reducer;

