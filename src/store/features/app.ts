import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState: AppState = {
  disabled: false,
  loading: false,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setDisabled: (state, action: PayloadAction<boolean>) => {
      state.disabled = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {setDisabled, setLoading} = appSlice.actions;

export default appSlice.reducer;
