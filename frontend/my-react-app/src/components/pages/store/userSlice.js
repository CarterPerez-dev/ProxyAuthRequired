// store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/* -----------------------------
   THUNKS FOR REGISTER/LOGIN
----------------------------- */

// Register user
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      // POST to /api/test/user
      const response = await fetch('/api/test/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      // Expected backend response: { message, user_id }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // POST to /api/test/login
      const response = await fetch('/api/test/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      // Expected: { user_id, username, coins, xp, level }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* -----------------------------
   THUNKS FOR USER DATA
----------------------------- */

// Fetch user data from MongoDB
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId, { rejectWithValue }) => {
    try {
      // GET to /api/test/user/<userId>
      const response = await fetch(`/api/test/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      // Expected: user document
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Daily bonus
export const dailyLoginBonus = createAsyncThunk(
  'user/dailyLoginBonus',
  async (userId, { rejectWithValue }) => {
    try {
      // POST to /api/test/user/<userId>/daily-bonus
      const response = await fetch(`/api/test/user/${userId}/daily-bonus`, {
        method: 'POST',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Daily bonus failed');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add XP
export const addXP = createAsyncThunk(
  'user/addXP',
  async ({ userId, xp }, { rejectWithValue }) => {
    try {
      // POST to /api/test/user/<userId>/add-xp
      const response = await fetch(`/api/test/user/${userId}/add-xp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xp }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Add XP failed');
      }
      // Expected: { xp: new_xp, level: new_level }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Coins
export const addCoins = createAsyncThunk(
  'user/addCoins',
  async ({ userId, coins }, { rejectWithValue }) => {
    try {
      // POST to /api/test/user/<userId>/add-coins
      const response = await fetch(`/api/test/user/${userId}/add-coins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coins }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Add coins failed');
      }
      return { coinsToAdd: coins };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* -----------------------------
   SLICE DEFINITION
----------------------------- */

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    username: '',
    xp: 0,
    level: 1,
    coins: 0,
    status: 'idle',   // For fetch statuses
    loading: false,   // For register/login
    error: null,
  },
  reducers: {
    setCurrentUserId(state, action) {
      state.userId = action.payload;
    },
    logout(state) {
      // Clear user data on logout
      state.userId = null;
      state.username = '';
      state.coins = 0;
      state.xp = 0;
      state.level = 1;
    },
  },
  extraReducers: (builder) => {
    /* --------------------------------
       Register user
    -------------------------------- */
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // If you want to auto-login after registration,
        // set state.userId = action.payload.user_id or dispatch loginUser.
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    /* --------------------------------
       Login user
    -------------------------------- */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // The backend returns: { user_id, username, coins, xp, level }
        const { user_id, username, coins, xp, level } = action.payload;
        state.userId = user_id;
        state.username = username;
        state.coins = coins;
        state.xp = xp;
        state.level = level;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    /* --------------------------------
       fetchUserData
    -------------------------------- */
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        // The response is the entire user doc from DB
        const userDoc = action.payload;
        state.userId = userDoc._id;
        state.username = userDoc.username;
        state.xp = userDoc.xp || 0;
        state.level = userDoc.level || 1;
        state.coins = userDoc.coins || 0;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

    /* --------------------------------
       dailyLoginBonus
    -------------------------------- */
      .addCase(dailyLoginBonus.fulfilled, (state, action) => {
        // If the server returns additional coins, you can update state here.
        if (action.payload.coins) {
          state.coins += action.payload.coins;
        }
      })

    /* --------------------------------
       addXP
    -------------------------------- */
      .addCase(addXP.fulfilled, (state, action) => {
        // { xp: new_xp, level: new_level }
        state.xp = action.payload.xp;
        state.level = action.payload.level;
      })

    /* --------------------------------
       addCoins
    -------------------------------- */
      .addCase(addCoins.fulfilled, (state, action) => {
        // { coinsToAdd }
        state.coins += action.payload.coinsToAdd;
      });
  },
});

export const { setCurrentUserId, logout } = userSlice.actions;
export default userSlice.reducer;

