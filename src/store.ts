import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {basketReducer} from "./feature/basket/basketSlice";
import {deviceReducer} from "./feature/device/deviceSlice";

const rootReducer = combineReducers({
    basket: basketReducer,
    device: deviceReducer
})

export const store = configureStore({
    reducer: rootReducer
})


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
