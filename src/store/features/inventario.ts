import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface InventarioState {
  categorias: ICategoria[];
}

const initialState: InventarioState = {
  categorias: [],
};

const invatarioSlice = createSlice({
  name: 'inventarioSlice',
  initialState,
  reducers: {
    setCategorias: (state, action: PayloadAction<ICategoria[]>) => {
      state.categorias = action.payload;
    },
  },
});

export const {setCategorias} = invatarioSlice.actions;

export default invatarioSlice.reducer;
