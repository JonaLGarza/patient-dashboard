import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  items: any[];
}

const initialState: DataState = {
  items: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any[]>) {
      state.items = action.payload;
    },
    updateData(state, action: PayloadAction<any>) {
      // Logic to update state with real-time data
    },
  },
});

export const { setData, updateData } = dataSlice.actions;
export default dataSlice.reducer;
