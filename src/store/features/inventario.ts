import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState: InventarioState = {
  categorias: [],
  artigos: [],
};

const invatarioSlice = createSlice({
  name: 'inventarioSlice',
  initialState,
  reducers: {
    setCategorias: (state, action: PayloadAction<ICategoria[]>) => {
      state.categorias = action.payload;
    },
    clearInventario: (state, action: PayloadAction<void>) => {
      state.artigos = [];
      state.categorias = [];
    },
    setArtigos: (state, action: PayloadAction<IArtigo[]>) => {
      state.artigos = action.payload;
    },
    pushArtigo: (state, action: PayloadAction<IArtigo>) => {
      state.artigos.push(action.payload);
    },
  },
});

export const {setCategorias, setArtigos, pushArtigo, clearInventario} = invatarioSlice.actions;

export default invatarioSlice.reducer;
