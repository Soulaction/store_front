import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BasketItemModel} from "../../model/BasketItemModel";
import {addBasketItems, deleteBasketItems, fetchBasketItems} from "./basketThunk";

export type BasketStore = {
    basketItems: BasketItemModel[];
    isLoading: boolean,
    errorMsg: string | null
}

const initialState: BasketStore = {
    basketItems: [],
    isLoading: false,
    errorMsg: ''

}
const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBasketItems.fulfilled, (state: BasketStore, action: PayloadAction<BasketItemModel[]>) => {
            state.isLoading = false;
            state.basketItems = action.payload;
            state.errorMsg = null;
        })
        builder.addCase(addBasketItems.fulfilled, (state: BasketStore, action: PayloadAction<BasketItemModel>) => {
            state.isLoading = false;
            state.basketItems.push(action.payload);
            state.errorMsg = null;
        })
        builder.addCase(deleteBasketItems.fulfilled, (state: BasketStore, action: PayloadAction<BasketItemModel[]>) => {
            state.isLoading = false;
            state.basketItems = action.payload;
            state.errorMsg = null;
        })
        builder.addMatcher((action) => action.type.endsWith('/pending'),
            (state: BasketStore) => {
            state.isLoading = true
        })
        builder.addMatcher((action) => action.type.endsWith('/rejected'),
            (state: BasketStore, action: PayloadAction<string>) => {
            state.isLoading = false
            state.errorMsg = action.payload as string;
        })
    },
})

export const basketReducer = basketSlice.reducer;
