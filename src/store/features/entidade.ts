import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState: IEntidadeState = {
  eEndereco: null,
  entidade: null,
};

const entidadeSlice = createSlice({
  name: 'entidadeSlice',
  initialState,
  reducers: {
    setEntidade: (state, action: PayloadAction<IEntidade>) => {
      state.entidade = action.payload;
    },
    setEndereco: (state, action: PayloadAction<IEEndereco>) => {
      state.eEndereco = action.payload;
    },
    setEntidadeMap: (state, action: PayloadAction<IEntidadeMap>) => {
      state.eEndereco = action.payload.eEndereco;
      state.entidade = action.payload.entidade;
    },
    setClearEntity: (state, action: PayloadAction<void>) => {
      state.eEndereco = null;
      state.entidade = null;
    },
    
  },
});

export const {setEndereco, setEntidade, setClearEntity,setEntidadeMap} = entidadeSlice.actions;

export default entidadeSlice.reducer;
