import { configureStore, createSlice } from '@reduxjs/toolkit';

interface StateType {
  data: object;
}

const initialState: StateType = {
  data: {}
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    }
  }
});

export const { setData } = dataSlice.actions;

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer
  }
});
