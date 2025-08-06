import { createSlice } from "@reduxjs/toolkit";

const initialState={
    socket:null,
    isSocketConn:false,

}
const socketSlice=createSlice({
    name:'socket',
    initialState,
    reducers:{
        setSocket:(state,action)=>{
            state.socket=action.payload;
            state.isSocketConn=true;
        },

    }

})
export const {setSocket}=socketSlice.actions;
export default socketSlice.reducer;