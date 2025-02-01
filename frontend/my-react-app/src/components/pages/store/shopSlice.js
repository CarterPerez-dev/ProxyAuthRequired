// store/shopSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch items from MongoDB
export const fetchShopItems = createAsyncThunk(
  'shop/fetchShopItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/test/shop');
      if (!response.ok) throw new Error('Failed to fetch shop items');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Handle purchase requests
// Note: You must pass in { itemId, userId } to let the backend know who is buying
export const purchaseItem = createAsyncThunk(
  'shop/purchaseItem',
  async ({ itemId, userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/test/shop/purchase/${itemId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Purchase failed');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShopItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchShopItems.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })

      .addCase(purchaseItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(purchaseItem.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(purchaseItem.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  }
});

export default shopSlice.reducer;

