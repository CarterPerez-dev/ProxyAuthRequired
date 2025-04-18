// src/components/pages/store/slice/phishingPhrenzySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch phishing examples from the backend
export const fetchPhishingData = createAsyncThunk(
  'phishingPhrenzy/fetchPhishingData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/games/phishing/examples');
      if (!response.ok) {
        throw new Error('Failed to fetch phishing examples');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to submit game results to backend
export const submitGameResults = createAsyncThunk(
  'phishingPhrenzy/submitGameResults',
  async ({ userId, score, timestamp }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/games/phishing/submit-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          score,
          timestamp
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit game results');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  phishingItems: [],
  gameStatus: 'idle', // 'idle', 'playing', 'finished'
  score: 0,
  highScore: parseInt(localStorage.getItem('phishingPhrenzyHighScore') || '0', 10),
  loading: false,
  error: null,
  lastSubmittedScore: null,
  achievements: [],
};

const phishingPhrenzySlice = createSlice({
  name: 'phishingPhrenzy',
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStatus = 'playing';
      state.score = 0;
    },
    endGame: (state, action) => {
      state.gameStatus = 'finished';
      // Update high score if current score is higher
      if (state.score > state.highScore) {
        state.highScore = state.score;
        localStorage.setItem('phishingPhrenzyHighScore', state.score.toString());
      }
      
      // Submit score to backend if userId is provided
      const userId = action.payload;
      if (userId) {
        // This will be handled by the submitGameResults thunk
        state.lastSubmittedScore = {
          score: state.score,
          timestamp: new Date().toISOString()
        };
      }
    },
    incrementScore: (state, action) => {
      state.score += action.payload;
    },
    decrementScore: (state, action) => {
      state.score = Math.max(0, state.score - action.payload);
    },
    resetGame: (state) => {
      state.gameStatus = 'idle';
      state.score = 0;
      // Shuffle phishing items for next game
      state.phishingItems = [...state.phishingItems]
        .sort(() => Math.random() - 0.5)
        .map(item => ({ ...item }));
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch phishing data
      .addCase(fetchPhishingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhishingData.fulfilled, (state, action) => {
        state.loading = false;
        state.phishingItems = action.payload;
      })
      .addCase(fetchPhishingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Submit game results
      .addCase(submitGameResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitGameResults.fulfilled, (state, action) => {
        state.loading = false;
        state.lastSubmittedScore = null;
        
        // If the server returned any achievements, store them
        if (action.payload.achievements) {
          state.achievements = action.payload.achievements;
        }
      })
      .addCase(submitGameResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // We keep the lastSubmittedScore in case we want to retry
      });
  },
});

export const { 
  startGame, 
  endGame, 
  incrementScore, 
  decrementScore, 
  resetGame 
} = phishingPhrenzySlice.actions;

export default phishingPhrenzySlice.reducer;
