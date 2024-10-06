// src/redux/slices/preferencesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
  sorting: string;
  filtering: string;
}

const initialState: PreferencesState = {
  sorting: 'default',
  filtering: 'all',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setSorting(state, action: PayloadAction<string>) {
      state.sorting = action.payload;
    },
    setFiltering(state, action: PayloadAction<string>) {
      state.filtering = action.payload;
    },
  },
});

export const { setSorting, setFiltering } = preferencesSlice.actions;
export default preferencesSlice.reducer;
