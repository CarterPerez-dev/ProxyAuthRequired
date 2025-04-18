// src/components/pages/store/slice/cipherChallengeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addCoins, fetchUserData } from './userSlice';

// Fetch cipher challenges from the backend
export const fetchCipherChallenges = createAsyncThunk(
  'cipherChallenge/fetchChallenges',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/games/cipher/challenges');
      if (!response.ok) {
        throw new Error('Failed to fetch cipher challenges');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Submit a solution to a cipher challenge
export const submitSolution = createAsyncThunk(
  'cipherChallenge/submitSolution',
  async ({ userId, challengeId, levelId, hintUsed, timeSpent }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch('/api/games/cipher/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          challengeId,
          levelId,
          hintUsed,
          timeSpent,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit solution');
      }
      
      const data = await response.json();
      
      // If the backend awarded coins, update user state
      if (data.coinsAwarded > 0) {
        dispatch(addCoins({ 
          userId, 
          amount: data.coinsAwarded 
        }));
      }
      
      // Fetch updated user data (for XP, etc.)
      dispatch(fetchUserData(userId));
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Unlock a hint for a cipher challenge
export const unlockHint = createAsyncThunk(
  'cipherChallenge/unlockHint',
  async ({ userId, challengeId, hintIndex, cost }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch('/api/games/cipher/unlock-hint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          challengeId,
          hintIndex,
          cost,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to unlock hint');
      }
      
      const data = await response.json();
      
      // Update user coins (deducted cost)
      dispatch(fetchUserData(userId));
      
      return { challengeId, hintIndex };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  challenges: [],
  currentChallenge: null,
  completedChallenges: [],
  maxUnlockedLevel: 1,
  unlockedHints: {}, // { challengeId: [hintIndices] }
  hintUsed: false,
  loading: false,
  error: null,
};

const cipherChallengeSlice = createSlice({
  name: 'cipherChallenge',
  initialState,
  reducers: {
    resetCurrentChallenge: (state, action) => {
      state.currentChallenge = action.payload;
      state.hintUsed = false;
    },
    unlockNextLevel: (state, action) => {
      const nextLevel = action.payload;
      if (nextLevel > state.maxUnlockedLevel) {
        state.maxUnlockedLevel = nextLevel;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch challenges
      .addCase(fetchCipherChallenges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCipherChallenges.fulfilled, (state, action) => {
        state.loading = false;
        state.challenges = action.payload.challenges;
        
        // Set completed challenges from response
        state.completedChallenges = action.payload.completedChallenges || [];
        
        // Set max unlocked level from response
        state.maxUnlockedLevel = action.payload.maxUnlockedLevel || 1;
        
        // Set unlocked hints from response
        state.unlockedHints = action.payload.unlockedHints || {};
        
        // If no current challenge is set, set the first challenge of level 1
        if (!state.currentChallenge && state.challenges.length > 0) {
          const level1Challenges = state.challenges.filter(c => c.levelId === 1);
          if (level1Challenges.length > 0) {
            // Find first uncompleted challenge
            const firstUncompleted = level1Challenges.find(
              c => !state.completedChallenges.includes(c.id)
            );
            
            // If all are completed, use the first one
            state.currentChallenge = firstUncompleted || level1Challenges[0];
          }
        }
      })
      .addCase(fetchCipherChallenges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Submit solution
      .addCase(submitSolution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitSolution.fulfilled, (state, action) => {
        state.loading = false;
        
        // Add challenge to completed list if not already there
        if (!state.completedChallenges.includes(action.meta.arg.challengeId)) {
          state.completedChallenges.push(action.meta.arg.challengeId);
        }
      })
      .addCase(submitSolution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Unlock hint
      .addCase(unlockHint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlockHint.fulfilled, (state, action) => {
        state.loading = false;
        const { challengeId, hintIndex } = action.payload;
        
        // Initialize the array for this challenge if it doesn't exist
        if (!state.unlockedHints[challengeId]) {
          state.unlockedHints[challengeId] = [];
        }
        
        // Add the hint index if not already there
        if (!state.unlockedHints[challengeId].includes(hintIndex)) {
          state.unlockedHints[challengeId].push(hintIndex);
        }
        
        // Mark that a hint was used for the current challenge
        if (state.currentChallenge && state.currentChallenge.id === challengeId) {
          state.hintUsed = true;
        }
      })
      .addCase(unlockHint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCurrentChallenge, unlockNextLevel } = cipherChallengeSlice.actions;
export default cipherChallengeSlice.reducer;
