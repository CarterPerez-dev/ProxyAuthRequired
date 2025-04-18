import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showAchievementToast } from '../AchievementToast';
import {
  FaTrophy, FaMedal, FaStar, FaCrown, FaBolt, FaBook, FaBrain,
  FaCheckCircle, FaRegSmile, FaMagic
} from 'react-icons/fa';

// Import the thunks to fetch achievements and shop items
import { fetchAchievements } from './achievementsSlice';
import { fetchShopItems } from './shopSlice';

import iconMapping from "../../../iconMapping";
import colorMapping from "../../../colorMapping";


// Utility function to show toast for newlyUnlocked achievements:
function showNewlyUnlockedAchievements(newlyUnlocked, allAchievements) {
  if (!newlyUnlocked || newlyUnlocked.length === 0) return;
  newlyUnlocked.forEach((achId) => {
    const Icon = iconMapping[achId] ? iconMapping[achId] : FaTrophy;
    const color = colorMapping[achId] || "#fff";

    const foundAch = allAchievements?.find(a => a.achievementId === achId);
    const title = foundAch?.title || `Unlocked ${achId}`;
    const desc = foundAch?.description || 'Achievement Unlocked!';

    showAchievementToast({
      title,
      description: desc,
      icon: Icon ? <Icon /> : null,
      color
    });
  });
}

const initialUserId = localStorage.getItem('userId');

const initialState = {
  userId: initialUserId ? initialUserId : null,
  username: '',
  email: '',
  xp: 0,
  level: 1,
  coins: 0,
  achievements: [],
  xpBoost: 1.0,
  currentAvatar: null,
  nameColor: null,
  purchasedItems: [],
  subscriptionActive: false,
  oauth_provider: null,
  practiceQuestionsRemaining: 100,
  subscriptionType: 'free',

  status: 'idle',
  loading: false,
  error: null,
};

// REGISTER
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (formData, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await fetch('/api/test/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await fetch('/api/test/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      // Immediately fetch achievements + shop data after successful login
      dispatch(fetchAchievements());
      dispatch(fetchShopItems());

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// FETCH USER DATA
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`/api/test/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();

      // Also fetch achievements + shop items to ensure they're loaded
      dispatch(fetchAchievements());
      dispatch(fetchShopItems());

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Example of a daily bonus thunk:
export const claimDailyBonus = createAsyncThunk(
  'user/claimDailyBonus',
  async (userId, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await fetch(`/api/test/user/${userId}/daily-bonus`, {
        method: 'POST'
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || 'Daily bonus error');
      }
      // If new achievements came back, display them
      if (data.newlyUnlocked && data.newlyUnlocked.length > 0) {
        const allAchs = getState().achievements.all;
        showNewlyUnlockedAchievements(data.newlyUnlocked, allAchs);
      }
      return data; 
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// If you have an "addCoins" route, likewise
export const addCoins = createAsyncThunk(
  'user/addCoins',
  async ({ userId, amount }, { rejectWithValue, dispatch, getState }) => {
    try {
      const res = await fetch(`/api/test/user/${userId}/add-coins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coins: amount })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to add coins');
      }
      // Show newly unlocked achievements
      if (data.newlyUnlocked && data.newlyUnlocked.length > 0) {
        const allAchs = getState().achievements.all;
        showNewlyUnlockedAchievements(data.newlyUnlocked, allAchs);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Check subscription status
export const checkSubscription = createAsyncThunk(
  'user/checkSubscription',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/subscription/subscription-status?userId=${userId}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to check subscription status');
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Cancel subscription
export const cancelSubscription = createAsyncThunk(
  'user/cancelSubscription',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/subscription/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to cancel subscription');
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


// Fetch usage limits
export const fetchUsageLimits = createAsyncThunk(
  'user/fetchUsageLimits',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/test/user/${userId}/usage-limits`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch usage limits');
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Decrement questions
export const decrementQuestions = createAsyncThunk(
  'user/decrementQuestions',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/test/user/${userId}/decrement-questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update question count');
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUserId(state, action) {
      state.userId = action.payload;
    },
    logout(state) {
      state.userId = null;
      state.username = '';
      state.email = '';
      state.xp = 0;
      state.level = 1;
      state.coins = 0;
      state.achievements = [];
      state.xpBoost = 1.0;
      state.currentAvatar = null;
      state.nameColor = null;
      state.purchasedItems = [];
      state.subscriptionActive = false;
      state.status = 'idle';
      // Reset freemium fields
      state.practiceQuestionsRemaining = 100;
      state.subscriptionType = 'free';
      localStorage.removeItem('userId');
    },
    setXPAndCoins(state, action) {
      const { xp, coins, newlyUnlocked } = action.payload;
      state.xp = xp;
      state.coins = coins;
      
      // Add any new achievements to the array
      if (newlyUnlocked && Array.isArray(newlyUnlocked) && newlyUnlocked.length > 0) {
        newlyUnlocked.forEach(achievementId => {
          if (!state.achievements.includes(achievementId)) {
            state.achievements.push(achievementId);
          }
        });
      }
    },
    // Add this new action:
    clearAuthErrors(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const {
          user_id,
          username,
          email,
          coins,
          xp,
          level,
          achievements,
          xpBoost,
          currentAvatar,
          nameColor,
          purchasedItems,
          subscriptionActive,
          password,
          oauth_provider,
          // New freemium fields
          practiceQuestionsRemaining,
          subscriptionType
        } = action.payload;

        state.userId = user_id;
        state.username = username;
        state.email = email || '';
        state.coins = coins || 0;
        state.xp = xp || 0;
        state.level = level || 1;
        state.achievements = achievements || [];
        state.xpBoost = xpBoost !== undefined ? xpBoost : 1.0;
        state.currentAvatar = currentAvatar || null;
        state.nameColor = nameColor || null;
        state.purchasedItems = purchasedItems || [];
        state.subscriptionActive = subscriptionActive || false;
        state.oauth_provider = oauth_provider || null;
        // Set freemium fields
        state.practiceQuestionsRemaining = practiceQuestionsRemaining || 100;
        state.subscriptionType = subscriptionType || 'free';

        localStorage.setItem('userId', user_id);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH USER DATA
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        const userDoc = action.payload;

        state.userId = userDoc._id;
        state.username = userDoc.username;
        state.email = userDoc.email || '';
        state.xp = userDoc.xp || 0;
        state.level = userDoc.level || 1;
        state.coins = userDoc.coins || 0;
        state.achievements = userDoc.achievements || [];
        state.xpBoost = userDoc.xpBoost !== undefined ? userDoc.xpBoost : 1.0;
        state.currentAvatar = userDoc.currentAvatar || null;
        state.nameColor = userDoc.nameColor || null;
        state.purchasedItems = userDoc.purchasedItems || [];
        
        // IMPORTANT FIX: Be explicit about subscription status
        state.subscriptionActive = userDoc.subscriptionActive === true;
        state.subscriptionStatus = userDoc.subscriptionStatus || null;
        state.subscriptionPlatform = userDoc.subscriptionPlatform || null;
        state.stripeCustomerId = userDoc.stripeCustomerId || null;
        state.stripeSubscriptionId = userDoc.stripeSubscriptionId || null;
        state.appleTransactionId = userDoc.appleTransactionId || null;
        
        // Set freemium fields
        state.practiceQuestionsRemaining = userDoc.practiceQuestionsRemaining || 100;
        state.subscriptionType = userDoc.subscriptionType || 'free';
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // DAILY BONUS
      .addCase(claimDailyBonus.pending, (state) => {
        state.loading = true;
      })
      .addCase(claimDailyBonus.fulfilled, (state, action) => {
        state.loading = false;
        // Update local user coins/xp if success
        if (action.payload.success) {
          state.coins = action.payload.newCoins;
          state.xp = action.payload.newXP;
          
          // Update achievements if any were unlocked
          if (action.payload.newlyUnlocked && action.payload.newlyUnlocked.length > 0) {
            action.payload.newlyUnlocked.forEach(achievementId => {
              if (!state.achievements.includes(achievementId)) {
                state.achievements.push(achievementId);
              }
            });
          }
        }
      })
      .addCase(claimDailyBonus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD COINS
      .addCase(addCoins.fulfilled, (state, action) => {
        // If the payload includes new achievements, add them
        if (action.payload && action.payload.newlyUnlocked) {
          if (Array.isArray(action.payload.newlyUnlocked) && action.payload.newlyUnlocked.length > 0) {
            action.payload.newlyUnlocked.forEach(achievementId => {
              if (!state.achievements.includes(achievementId)) {
                state.achievements.push(achievementId);
              }
            });
          }
        }
      })
      
      // SUBSCRIPTION CHECK - NEW HANDLERS
      .addCase(checkSubscription.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkSubscription.fulfilled, (state, action) => {
        state.subscriptionActive = action.payload.subscriptionActive;
        state.subscriptionStatus = action.payload.subscriptionStatus;
        state.subscriptionPlatform = action.payload.subscriptionPlatform;
        state.status = 'idle';
      })
      .addCase(checkSubscription.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      
      // CANCEL SUBSCRIPTION
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.subscriptionStatus = 'canceling';
      })
      
      // NEW FREEMIUM ACTION HANDLERS
      
      // Fetch usage limits
      .addCase(fetchUsageLimits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsageLimits.fulfilled, (state, action) => {
        state.practiceQuestionsRemaining = action.payload.practiceQuestionsRemaining;
        state.subscriptionType = action.payload.subscriptionType;
        state.status = 'idle';
      })
      .addCase(fetchUsageLimits.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      
      // Decrement questions
      .addCase(decrementQuestions.fulfilled, (state, action) => {
        state.practiceQuestionsRemaining = action.payload.practiceQuestionsRemaining;
      })
      .addCase(decrementQuestions.rejected, (state, action) => {
        // Handle error but don't change question count if API call fails
        state.error = action.payload;
      });
  },
});

export const { setCurrentUserId, logout, setXPAndCoins, clearAuthErrors } = userSlice.actions;
export default userSlice.reducer;
