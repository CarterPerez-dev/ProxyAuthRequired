// src/components/pages/store/slice/threatHunterSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addCoins, fetchUserData } from './userSlice';

// Async thunk to fetch log scenarios
export const fetchLogScenarios = createAsyncThunk(
  'threatHunter/fetchLogScenarios',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/threat-hunter/scenarios');
      if (!response.ok) {
        throw new Error('Failed to fetch log scenarios');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to start a scenario
export const startScenario = createAsyncThunk(
  'threatHunter/startScenario',
  async ({ scenarioId, userId, difficulty }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/threat-hunter/start-scenario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenarioId,
          userId,
          difficulty
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to start scenario');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to submit analysis
export const submitAnalysis = createAsyncThunk(
  'threatHunter/submitAnalysis',
  async ({ userId, scenarioId, flaggedLines, detectedThreats, timeLeft }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch('/api/threat-hunter/submit-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          scenarioId,
          flaggedLines,
          detectedThreats,
          timeLeft
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit analysis');
      }
      
      const results = await response.json();
      
      // If the backend awarded coins, update user state
      if (results.coinsAwarded > 0) {
        dispatch(addCoins({ 
          userId, 
          amount: results.coinsAwarded 
        }));
      }
      
      // Fetch updated user data (for XP, etc.)
      dispatch(fetchUserData(userId));
      
      return results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  scenarios: [],
  currentScenario: null,
  selectedLog: null,
  gameStatus: 'selecting', // 'selecting', 'playing', 'completed'
  timeLeft: null,
  score: 0,
  results: null,
  loading: false,
  error: null,
};

const threatHunterSlice = createSlice({
  name: 'threatHunter',
  initialState,
  reducers: {
    resetGame: (state) => {
      state.currentScenario = null;
      state.selectedLog = null;
      state.gameStatus = 'selecting';
      state.timeLeft = null;
      state.score = 0;
      state.results = null;
      state.error = null;
    },
    selectLog: (state, action) => {
      state.selectedLog = action.payload;
    },
    updateTimer: (state, action) => {
      state.timeLeft = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch log scenarios
      .addCase(fetchLogScenarios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogScenarios.fulfilled, (state, action) => {
        state.loading = false;
        state.scenarios = action.payload;
      })
      .addCase(fetchLogScenarios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Start scenario
      .addCase(startScenario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startScenario.fulfilled, (state, action) => {
        state.loading = false;
        state.currentScenario = action.payload.scenario;
        state.gameStatus = 'playing';
        state.timeLeft = action.payload.timeLimit;
        state.selectedLog = action.payload.scenario.logs.length > 0 ? action.payload.scenario.logs[0].id : null;
        state.score = 0;
      })
      .addCase(startScenario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Submit analysis
      .addCase(submitAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.gameStatus = 'completed';
        state.results = action.payload;
        state.score = action.payload.score;
      })
      .addCase(submitAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetGame, selectLog, updateTimer } = threatHunterSlice.actions;
export default threatHunterSlice.reducer;
