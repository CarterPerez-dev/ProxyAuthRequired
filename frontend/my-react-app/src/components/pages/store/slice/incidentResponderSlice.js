// src/components/pages/store/slice/incidentResponderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addCoins, fetchUserData } from './userSlice';

// Fetch incident responder scenarios
export const fetchScenarios = createAsyncThunk(
  'incidentResponder/fetchScenarios',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/games/incident/scenarios');
      if (!response.ok) {
        throw new Error('Failed to fetch incident scenarios');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Start a scenario
export const startScenario = createAsyncThunk(
  'incidentResponder/startScenario',
  async ({ scenarioId, userId, difficulty }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/games/incident/start', {
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

// Select an action in a stage
export const selectAction = createAsyncThunk(
  'incidentResponder/selectAction',
  async ({ actionId, stageId, userId }, { dispatch, getState, rejectWithValue }) => {
    // If action is 'start', just move to the first stage
    if (actionId === 'start' && stageId === 'intro') {
      // Start the scenario
      const currentScenario = getState().incidentResponder.currentScenario;
      const stages = currentScenario.stages || [];
      
      if (stages.length > 0) {
        return {
          nextStage: stages[0],
          action: { id: 'start' },
          isComplete: false
        };
      } else {
        return rejectWithValue('No stages found in scenario');
      }
    }
    
    // If action is 'continue', just move to the next stage
    if (actionId === 'continue') {
      const { currentStage, currentScenario, selectedActions, score } = getState().incidentResponder;
      
      // Find the next stage
      const stages = currentScenario.stages || [];
      const currentIndex = stages.findIndex(stage => stage.id === currentStage.id);
      const isLastStage = currentIndex === stages.length - 1;
      
      if (isLastStage) {
        // Scenario is complete, submit results
        try {
          const response = await fetch('/api/games/incident/complete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              scenarioId: currentScenario.id,
              selectedActions,
              score
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to complete scenario');
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
          
          return {
            results,
            isComplete: true
          };
        } catch (error) {
          return rejectWithValue(error.message);
        }
      } else {
        // Move to the next stage
        return {
          nextStage: stages[currentIndex + 1],
          action: { id: 'continue' },
          isComplete: false
        };
      }
    }
    
    // For regular actions, send to backend
    try {
      const { currentStage, currentScenario } = getState().incidentResponder;
      
      const response = await fetch('/api/games/incident/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          scenarioId: currentScenario.id,
          stageId,
          actionId
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to process action');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  scenarios: [],
  currentScenario: null,
  currentStage: null,
  selectedActions: {},
  gameStatus: 'selecting', // 'selecting', 'intro', 'playing', 'completed'
  score: 0,
  results: null,
  loading: false,
  error: null,
};

const incidentResponderSlice = createSlice({
  name: 'incidentResponder',
  initialState,
  reducers: {
    resetGame: (state) => {
      state.currentScenario = null;
      state.currentStage = null;
      state.selectedActions = {};
      state.gameStatus = 'selecting';
      state.score = 0;
      state.results = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch scenarios
      .addCase(fetchScenarios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScenarios.fulfilled, (state, action) => {
        state.loading = false;
        state.scenarios = action.payload;
      })
      .addCase(fetchScenarios.rejected, (state, action) => {
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
        state.currentScenario = action.payload;
        state.gameStatus = 'intro';
        state.selectedActions = {};
        state.score = 0;
        state.results = null;
      })
      .addCase(startScenario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Select action
      .addCase(selectAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectAction.fulfilled, (state, action) => {
        state.loading = false;
        
        if (action.payload.isComplete) {
          // Scenario is complete
          state.gameStatus = 'completed';
          state.results = action.payload.results;
        } else {
          // Update current stage and save selected action
          state.currentStage = action.payload.nextStage;
          state.gameStatus = 'playing';
          
          if (action.payload.action && action.payload.action.id !== 'start' && action.payload.action.id !== 'continue') {
            // Store the action for this stage
            const actionId = action.payload.action.id;
            const stageId = state.currentStage ? state.currentStage.id : 'unknown';
            state.selectedActions[stageId] = actionId;
            
            // Update score
            if (action.payload.points) {
              state.score += action.payload.points;
            }
          }
        }
      })
      .addCase(selectAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetGame } = incidentResponderSlice.actions;
export default incidentResponderSlice.reducer;
