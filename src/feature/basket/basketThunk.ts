import {createAsyncThunk} from "@reduxjs/toolkit";
import {addBasket, DataBasket, deleteBasket, fetchBasketProduct} from "../../http/basket-http";
import {BasketItemModel} from "../../model/BasketItemModel";
import {errorHandler} from "../../utils/utils";
import {RootState} from "../../store";

export const fetchBasketItems = createAsyncThunk<BasketItemModel[], void,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'basket/fetchBasketItems',
    async (_, {rejectWithValue, getState}) => {
        try {
            const basketID: string = getState().basket.basketId;
            const {data} = await fetchBasketProduct(basketID);
            return data;
        } catch (e) {
            const errorText = errorHandler(e);
            return rejectWithValue(errorText);
        }
    },
)

export const addBasketItems = createAsyncThunk<BasketItemModel, string,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'basket/addBasketItems',
    async (deviceId, {rejectWithValue, getState}) => {
        try {
            const {data} = await addBasket({idBasketItem: getState().basket.basketId, id: deviceId});
            return data;
        } catch (e) {
            const errorText = errorHandler(e);
            return rejectWithValue(errorText);
        }
    },
)

export const deleteBasketItems = createAsyncThunk<BasketItemModel[], string,
    {
        state: RootState;
        rejectValue: string;
    }>(
    'basket/deleteBasketItems',
    async (deviceId, {rejectWithValue, getState}) => {
        try {
            await deleteBasket(deviceId);
            const basketItem: BasketItemModel[] = getState().basket.basketItems.filter(el => el.idBasketItem !== deviceId);
            return basketItem;
        } catch (e) {
            const errorText = errorHandler(e);
            return rejectWithValue(errorText);
        }
    },
)
