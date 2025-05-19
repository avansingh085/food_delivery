import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../utils/axiosInstance";
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, thunkAPI) => {
    try {
        const response = await apiClient.get('/profile');
       
        return  response.data.user
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

    error: null,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload;
            state.login = true;

        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.login = true;
                state.user = action.payload;
                
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { updateUser, setCart } = userSlice.actions;
export default userSlice.reducer;