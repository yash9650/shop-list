import {configureStore} from '@reduxjs/toolkit';
import shopSlice from './shopSlice';

const store = configureStore({reducer: {
     'shopList': shopSlice 
}})

export default store;