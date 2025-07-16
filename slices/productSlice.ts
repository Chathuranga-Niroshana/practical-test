import type { Product, ProductState } from '@/types/productTypes';
import axiosInstance from '@/utils/axiosInstance';
import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
}

// get products thunk
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>('products/fetchAll', async (credentials, thunkAPI) => {
    try {
        const response = await axiosInstance.get('/products');
        return response.data.products as Product[];
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        if (error.response && error.response.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue('Login failed due to unknown error');
    }
});

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Fetch products failed';
            })
    },
})

export default productSlice.reducer;