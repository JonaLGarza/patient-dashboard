// src/redux/slices/preferencesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
  sorting: string;
  filtering: string;
  diagnosisFilter: string;
  admissionDateRange: string;
}

const initialState: PreferencesState = {
  sorting: localStorage.getItem('sorting') || 'default',
  filtering: localStorage.getItem('filtering') || 'all',
  diagnosisFilter: '',
  admissionDateRange: '',
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
    setDiagnosisFilter(state, action: PayloadAction<string>) {
      state.diagnosisFilter = action.payload;
    },
    setAdmissionDateRange(state, action: PayloadAction<string>) {
      state.admissionDateRange = action.payload;
    },
  },
});

export const {
  setSorting,
  setFiltering,
  setDiagnosisFilter,
  setAdmissionDateRange,
} = preferencesSlice.actions;
export default preferencesSlice.reducer;