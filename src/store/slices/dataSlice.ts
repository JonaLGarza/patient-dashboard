import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PatientData {
  userId: number;
  name: string;
  gender: string;
  age: number;
  weight: number;
  diagnosis: string;
  medications: string[];
  bloodPressure: number;
  heartRate: number;
  oxygenLevel: number;
  temperature: number;
  allergies: string[];
  admissionDate: string;
}

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
    updatePatientVitals(state, action: PayloadAction<PatientData>) {
      const updatedPatient = action.payload;
      const index = state.items.findIndex(
        (item) => item.userId === updatedPatient.userId
      );
      if (index !== -1) {
        // Update the patient data
        state.items[index] = {
          ...state.items[index],
          ...updatedPatient,
        };
      } else {
        // If the patient doesn't exist, add them
        state.items.push(updatedPatient);
      }
    },
    updateAllPatientVitals(state, action: PayloadAction<PatientData[]>) {
      const updatedPatients = action.payload;
      updatedPatients.forEach((updatedPatient) => {
        const index = state.items.findIndex(
          (item) => item.userId === updatedPatient.userId
        );
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...updatedPatient,
          };
        }
      });
    },
  },
});

export const { setData, updatePatientVitals, updateAllPatientVitals } = dataSlice.actions;
export default dataSlice.reducer;
