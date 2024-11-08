import {createAsyncThunk} from "@reduxjs/toolkit";
import {addBasket, DataBasket, deleteBasket, fetchBasketProduct} from "../../http/basket-http";
import {BasketItemModel} from "../../model/BasketItemModel";
import {errorHandler} from "../../utils/utils";
import {RootState} from "../../store";

export const fetchBasketItems = createAsyncThunk<BasketItemModel[], string,
    {
        rejectValue: string;
    }>(
    'basket/fetchBasketItems',
    async (userId, {rejectWithValue}) => {
        try {
            const {data} = await fetchBasketProduct(userId);
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
            const {data} = await addBasket({userId: getState().userInfo.user.id, deviceId});
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
    async (idItemBasket, {rejectWithValue, getState}) => {
        try {
            await deleteBasket(idItemBasket);
            const basketItem: BasketItemModel[] = getState().basket.basketItems.filter(el => el.id !== idItemBasket);
            return basketItem;
        } catch (e) {
            const errorText = errorHandler(e);
            return rejectWithValue(errorText);
        }
    },
)
