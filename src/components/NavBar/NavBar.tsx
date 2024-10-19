import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import setting from "../../assets/setting.svg";
import basket from "../../assets/basket.svg";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PRODUCT_EDIT_ROUTE, SHOP_ROUTE} from "../AppRouter/consts";
import s from './NavBar.module.css';


const NavBar = () => {
    // const {userStore} = useContext(ContextApp);
    const userStore = {isAuth: true, setIsUser: (data) => {}, setIsAuth: (data) => {} }
    const navigate = useNavigate()

    const logOut = () => {
        userStore.setIsAuth(false);
        userStore.setIsUser({});
    }

    return (
        <header className={s.header}>
            <NavLink className={s.mainPageLink} to={SHOP_ROUTE}>Магазин</NavLink>
            {userStore.isAuth ?
                <div className={s.avatarBlock}>
                    <button className={s.button}
                            type="button"
                            onClick={() => navigate(BASKET_ROUTE)}>
                        <img className={s.icon} src={basket} alt="Иконка корзины"/>
                    </button>
                    <button className={s.button}
                            onClick={() => navigate(ADMIN_ROUTE + '/' + PRODUCT_EDIT_ROUTE)}
                            type="button">
                        <img className={s.icon} src={setting} alt="Иконка настроек администратора"/>
                    </button>
                </div>
                :
                <NavLink to={LOGIN_ROUTE}>
                    <button>
                        Авторизация
                    </button>
                </NavLink>
            }
        </header>
    )
}

export default NavBar;
