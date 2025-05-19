import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../utils/axiosInstance";
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, thunkAPI) => {
    try {
        for(let round=0;round<10;round++)
        {
            try{
        const response = await apiClient.get('/profile');
       
        return  response.data.user
            }catch(err)
            {
                
            }
        }
        
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message || 'Failed to fetch user'
        )

    }

})
const initialState = {
    user: {},
    cart: [],
    loading: false,
    login: false,
    showLoginPopup:false,
    error: null,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload;
            state.login = true;
            state.showLoginPopup=false;

        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setShowLoginPopup:(state,action)=>{
            state.showLoginPopup=action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.login = true;
                state.showLoginPopup=false;
                state.user = action.payload;
                
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { updateUser, setCart ,setShowLoginPopup} = userSlice.actions;
export default userSlice.reducer;