import React from 'react';
import s from './MenuItems.module.css'
import {NavLink} from "react-router-dom";
import {BRAND_EDIT_ROUTE, PRODUCT_EDIT_ROUTE, TYPE_EDIT_ROUTE} from "../../../../components/AppRouter/consts";

type ListItem = {
    name: string;
    link: string;
}

export const MenuItems = () => {

    const menuList: ListItem[] = [{
        name: 'Управление карточками товаров',
        link: PRODUCT_EDIT_ROUTE
    }, {
        name: 'Управление брендами',
        link: BRAND_EDIT_ROUTE
    }, {
        name: 'Управление типами',
        link: TYPE_EDIT_ROUTE
    }
    ];

    return (
        <ul>
            {menuList.map((item) =>
                <li key={item.link}>
                    <NavLink to={item.link}
                             className={({isActive}) => s.itemBtn + ' ' + (isActive ? s.selectedItemBtn : '')}>
                        {item.name}</NavLink>
                </li>)
            }
        </ul>
    );
};