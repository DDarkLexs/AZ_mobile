import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InventarioState {
  categorias: ICategoria[];
  artigos: IArtigo[];
}

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
    setArtigos: (state, action: PayloadAction<IArtigo[]>) => {
      state.artigos = action.payload;
    },
    pushArtigo: (state, action: PayloadAction<IArtigo>) => {
      state.artigos.push(action.payload);
    },
  },
});

export const {setCategorias, setArtigos, pushArtigo} = invatarioSlice.actions;

export default invatarioSlice.reducer;
