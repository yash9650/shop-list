import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    list: [
        {
            id: uuidv4(),
            shopName: "StopNShop",
            area: "Thane",
            category: "Grocery",
            openDate: "2022-11-01",
            closeDate: "2022-11-03"
        },
    ]
};

const shopSlice = createSlice({
    name: 'shopList',
    initialState,
    reducers:{
        add: (state,action) => {
            state.list.push(action.payload);
        },
        del: (state,action) => {
            const index = state.list.findIndex(e => e.id === action.payload);
            state.list.splice(index,1);
        }
    }
});

export const {add,del} = shopSlice.actions;

export default shopSlice.reducer;