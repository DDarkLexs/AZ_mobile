import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState: AppState = {
  disabled: false,
  loading: false,
  routePath: '',
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setDisabled: (state, action: PayloadAction<boolean>) => {
      state.disabled = action.payload;
    },
    setRoutePath: (state, action: PayloadAction<string>) => {
      state.routePath = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {setDisabled, setLoading, setRoutePath} = appSlice.actions;

export default appSlice.reducer;
