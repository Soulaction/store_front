import Basket from "../../pages/Basket/Basket"
import DevicePage from "../../pages/DevicePage/DevicePage"
import Shop from "../../pages/Shop/Shop"
import Keeper from "../../pages/Keeper"
import {
    ADMIN_ROUTE,
    ADMIN_USER_ROUTE,
    BASKET_ROUTE,
    BRAND_EDIT_ROUTE,
    DESK_ROUTE,
    PRODUCT_EDIT_ROUTE,
    PRODUCT_ROUTE,
    PRODUCTS_ROUTE,
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
import AdminUserPage from "../../pages/AdminUserPage/AdminUserPage";
import Desk from "../../pages/Desk/Desk";

type RouteType = {
    path: string;
    Component: FunctionComponent;
    roles?: string[];
    children?: RouteType[]
}

export const authRoutes: RouteType[] = [
    {
        path: BASKET_ROUTE,
        Component: Basket,
        roles: ['USER', 'ADMIN']
    },
    {
        path: STORE_KEEPER_ROUTE,
        Component: Keeper
    },
    {
        path: ADMIN_ROUTE,
        Component: Administration,
        roles: ['ADMIN'],
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
        path: PRODUCTS_ROUTE + '/:idType',
        Component: Shop
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: ADMIN_USER_ROUTE,
        Component: AdminUserPage
    },
    {
        path: DESK_ROUTE,
        Component: Desk
    },
]
