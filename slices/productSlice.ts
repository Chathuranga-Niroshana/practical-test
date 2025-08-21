import type { Product, ProductState } from '@/types/productTypes';
import axiosInstance from '@/utils/axiosInstance';
import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    searchedProducts: [],
    loading: false,
    error: null,
}

// get products thunk
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>('products/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get('/products');
        return response.data.products as Product[];
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        if (error.response && error.response.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue('fetch failed due to unknown error');
    }
});

export const fetchProductById = createAsyncThunk<Product, number, { rejectValue: string }>('products/fetchById', async (id: number, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        if (error.response && error.response.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue('fetch failed due to unknown error');
    }
});


export const fetchSearchProduct = createAsyncThunk<Product[], string, { rejectValue: string }>('products/searchProducts', async (query, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/products/search?q=${query}`);
        return response.data.products as Product[];
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        if (error.response && error.response.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue('fetch failed due to unknown error');
    }
});


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearSelectedProduct(state) {
            state.selectedProduct = null;
        }
    },
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

            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.selectedProduct = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Fetch products failed';
            })

            .addCase(fetchSearchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchProduct.fulfilled, (state, action) => {
                state.searchedProducts = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchSearchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Fetch products failed';
            })
    },
})
export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;