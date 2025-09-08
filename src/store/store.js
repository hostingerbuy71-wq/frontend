import { configureStore } from '@reduxjs/toolkit';

// Simple initial reducer - can be expanded later
const initialState = {
  user: null,
  isAuthenticated: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    app: appReducer
  }
});

export default store;
