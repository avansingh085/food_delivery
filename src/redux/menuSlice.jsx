import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/axiosInstance';

export const fetchFoodData = createAsyncThunk(
    'menu/fetchMenu',
    async (_, thunkAPI) => {
        try {
            const response = await apiClient.get('/getMenu', {
                params: { page: 1, limit: 20 },
            });
            console.log(response.data, "HELLOWOWOOW")
            return response.data.items;
        }
        catch (err) {
            console.log(err, "error during food fetch Thunk");
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch food'
            );
        }
    }
);

const initialState = {
    menu: [],
    error: null,
    loading: false
}
const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        setFoodData: (state, action) => {
            state.menu = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFoodData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchFoodData.fulfilled, (state, action) => {
                state.loading = false;
                state.menu = action.payload;

            }).addCase(fetchFoodData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});
export const { setFoodData } = foodSlice.actions;
export default foodSlice.reducer;

