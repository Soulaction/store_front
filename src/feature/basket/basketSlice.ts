import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BasketItemModel} from "../../model/BasketItemModel";
import {addBasketItems, deleteBasketItems, fetchBasketItems} from "./basketThunk";

export type BasketStore = {
    basketId: string;
    basketItems: BasketItemModel[];
    isLoading: boolean,
    errorMsg: string | null
}

const initialState: BasketStore = {
    basketId: 'e2196ee5-b2de-41dd-a941-c4d5a653bc4f',
    basketItems: [],
    isLoading: false,
    errorMsg: ''

}
const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasketId: (state: BasketStore, action: PayloadAction<string>) => {
            state.basketId = action.payload;
        }
    },
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

export const setBasketId = basketSlice.actions.setBasketId;
export const basketReducer = basketSlice.reducer;
