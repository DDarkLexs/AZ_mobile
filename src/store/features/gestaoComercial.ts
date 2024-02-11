import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState: GestaoComercialState = {
  cart: [],
};

const gestaoComercialSlice = createSlice({
  name: 'gestaoComercialSlice',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    },
    removeItem: (state, action: PayloadAction<IArtigo>) => {
      // const item = action.payload;
      // const exists = state.cart.find(obj => obj.artigoId === item.artigoId);
      // if (exists) {
      //   const i = state.cart.findIndex(obj => obj.artigoId === item.artigoId);
      //   state.cart[i].quantidade = state.cart[i].quantidade - 1;
      // } else {
      //   // state.cart.push({
      //   //   artigoId: item.artigoId,
      //   //   desconto: 0,
      //   //   nome: item.nome,
      //   //   preco: Number(item.preco),
      //   //   quantidade: 1,
      //   // });
      //   console.log(`${item.nome} ainda não foi inserido`);
      // }

      // state.artigos = action.payload;
    },
  },
});

export const {setCart, removeItem} = gestaoComercialSlice.actions;

export default gestaoComercialSlice.reducer;
