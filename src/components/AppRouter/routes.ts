import Admin from "../../pages/Admin"
import Auth from "../../pages/Auth"
import Basket from "../../pages/Basket"
import DevicePage from "../../pages/DevicePage"
import Shop from "../../pages/Shop/Shop"
import Keeper from "../../pages/Keeper"
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    PRODUCT_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    STORE_KEEPER_ROUTE
} from "./consts"
import Main from "../../pages/Main/Main";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },

    {
        path: BASKET_ROUTE + '/:id',
        Component: Basket
    },

    {
        path: STORE_KEEPER_ROUTE,
        Component: Keeper
    },

]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Main
    },
    {
        path: PRODUCT_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },

]
