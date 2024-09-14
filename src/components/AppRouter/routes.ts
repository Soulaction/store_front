import Auth from "../../pages/Auth"
import Basket from "../../pages/Basket"
import DevicePage from "../../pages/DevicePage"
import Shop from "../../pages/Shop/Shop"
import Keeper from "../../pages/Keeper"
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    BRAND_EDIT_ROUTE,
    PRODUCT_ROUTE,
    LOGIN_ROUTE,
    PRODUCT_EDIT_ROUTE,
    PRODUCTS_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    STORE_KEEPER_ROUTE,
    TYPE_EDIT_ROUTE
} from "./consts"
import Main from "../../pages/Main/Main";
import Administration from "../../pages/Admimstration/Administration";
import {BrandEdit} from "../../pages/Admimstration/pages/BrandEdit/BrandEdit";
import {TypeEdit} from "../../pages/Admimstration/pages/TypeEdit/TypeEdit";
import {ProductEdit} from "../../pages/Admimstration/pages/ProductEdit/ProductEdit";
import {FunctionComponent} from "react";

type RouteType = {
    path: string;
    Component: FunctionComponent;
    children?: RouteType[]
}

export const authRoutes: RouteType[] = [
    {
        path: BASKET_ROUTE + '/:id',
        Component: Basket
    },
    {
        path: STORE_KEEPER_ROUTE,
        Component: Keeper
    },
    {
        path: ADMIN_ROUTE,
        Component: Administration,
        children: [
            {
                path: PRODUCT_EDIT_ROUTE,
                Component: ProductEdit
            },
            {
                path: BRAND_EDIT_ROUTE,
                Component: BrandEdit
            },
            {
                path: TYPE_EDIT_ROUTE,
                Component: TypeEdit
            },
        ]
    },

]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Main
    },
    {
        path: PRODUCTS_ROUTE,
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
        path: PRODUCT_ROUTE + '/:id',
        Component: DevicePage
    },

]
