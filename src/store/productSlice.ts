import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
}

export interface ProductsState {
	products: Product[];
	loading: boolean;
	error: string | null;
	filters: {
		search: string;
		category: string;
		sort: string;
		page: number;
		minPrice?: number | null;
		maxPrice?: number | null;
	};
}

const initialState: ProductsState = {
	products: [],
	loading: false,
	error: null,
	filters: {
		search: '',
		category: 'all',
		sort: 'none',
		page: 1,
    minPrice: null,
    maxPrice: null,
	},
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk<Product[]>(
	'products/fetchProducts',
	async () => {
		const response = await axios.get('https://fakestoreapi.com/products');
		return response.data;
	}
);

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<Product>) => {
			state.products.push(action.payload);
		},
		editProduct: (state, action: PayloadAction<Product>) => {
			const index = state.products.findIndex(
				(p) => p.id === action.payload.id
			);
			if (index !== -1) {
				state.products[index] = action.payload;
			}
		},
		deleteProduct: (state, action: PayloadAction<number>) => {
			state.products = state.products.filter(
				(p) => p.id !== action.payload
			);
		},

		setSearch: (state, action: PayloadAction<string>) => {
			state.filters.search = action.payload;
			state.filters.page = 1;
		},
		setCategory: (state, action: PayloadAction<string>) => {
			state.filters.category = action.payload;
			state.filters.page = 1;
		},
		setSort: (state, action: PayloadAction<'none' | 'price-asc' | 'price-desc'>) => {
			state.filters.sort = action.payload;
			state.filters.page = 1; // optional, to reset pagination when sorting
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.filters.page = action.payload;
		},
		setMinPrice: (state, action: PayloadAction<number | null>) => {
			state.filters.minPrice = action.payload;
			state.filters.page = 1;
		},
		setMaxPrice: (state, action: PayloadAction<number | null>) => {
			state.filters.maxPrice = action.payload;
			state.filters.page = 1;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.error.message || 'Failed to fetch products';
			});
	},
});

export const {
	addProduct,
	editProduct,
	deleteProduct,
	setSearch,
	setCategory,
	setSort,
	setPage,
	setMinPrice,
	setMaxPrice,
} = productSlice.actions;
export default productSlice.reducer;
