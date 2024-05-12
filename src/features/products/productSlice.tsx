import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
	id: number;
	name: string;
	description: string;
	options?: {
		size: string;
		amount: number;
	};
	active: boolean;
	createdAt: string;
}

interface ProductState {
	items: Product[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductState = {
	items: [],
	status: 'idle',
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	const response = await axios.get<Product[]>('http://localhost:3001/products');
	return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product: Product) => {
	const response = await axios.put(`http://localhost:3001/products/${product.id}`, product);
	return response.data;
});

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchProducts.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				const index = state.items.findIndex(item => item.id === action.payload.id);
				if (index !== -1) {
					state.items[index] = action.payload;
				}
			});
	},
});

export default productSlice.reducer;