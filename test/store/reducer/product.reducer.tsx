import { Reducer } from 'redux';
import { ProductType } from '../types/enum';
import { ProductState } from '../types/interface';

const initialState: ProductState = {
  product: [],
  save: [],
  total: {
    total: 0,
    sub_total: 0,
    shop: 'Gratis',
  },
};

export const productReducer: Reducer<ProductState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ProductType.load_product:
      return {
        ...state,
        product: action.payload.data,
      };
      break;
    case ProductType.add_product:
      state.product = state.product.map((x) => {
        if (x.id === action.payload.data.id) {
          x.quantity++;
          const total = state.total.total + x.price;
          state.total.total = total;
          state.total.sub_total = total.toFixed(2);

          return x;
        } else return x;
      });
      return {
        ...state,
      };
      break;
    case ProductType.remove_product:
      state.product = state.product.map((x) => {
        if (x.id === action.payload.data.id) {
          if (x.quantity !== 0) {
            x.quantity--;
            const total = state.total.total - x.price;
            state.total.total = total;
            state.total.sub_total = total.toFixed(2);
          }
          return x;
        } else return x;
      });
      return {
        ...state,
      };
      break;
    case ProductType.save_product:
      if (state.save.filter((x) => x.id === action.payload.data.id)[0]) {
        state.save = state.save.filter(function (x) {
          return x.id !== action.payload.data.id;
        });
      } else {
        state.save = [...state.save, action.payload.data];
      }
      return {
        ...state,
      };
      break;
    case ProductType.destroy_product:
      const product = state.product.filter(function (x) {
        return x.id !== action.payload.id;
      });
      const match = state.product.filter(function (x) {
        return x.id === action.payload.id;
      });
      const total = match[0].quantity * match[0].price;
      state.total.total = state.total.total - total;
      state.total.sub_total = state.total.total.toFixed(2);
      state.product = product;
      return {
        ...state,
      };
      break;
    default:
      return state;
      break;
  }
};
