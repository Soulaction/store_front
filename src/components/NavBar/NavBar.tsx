import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import setting from "../../assets/setting.svg";
import basket from "../../assets/basket.svg";
import exit from "../../assets/exit.svg";
import {ADMIN_ROUTE, BASKET_ROUTE, PRODUCT_EDIT_ROUTE, SHOP_ROUTE} from "../AppRouter/consts";
import s from './NavBar.module.css';
import {useAppDispatch, useAppSelector} from "../../feature/hooks/hooks";
import {setUser} from "../../feature/user/userSlice";


const NavBar = () => {
    const userInfo = useAppSelector(state => state.userInfo);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        dispatch(setUser(null));
        localStorage.removeItem('accessToken');
    }

    return (
        <header className={s.header}>
            <NavLink className={s.mainPageLink} to={SHOP_ROUTE}>Магазин</NavLink>
            {userInfo.user ?
                <div className={s.avatarBlock}>
                    <button className={s.button}
                            type="button"
                            onClick={() => navigate(BASKET_ROUTE)}>
                        <img className={s.icon} src={basket} alt="Иконка корзины"/>
                    </button>
                    {userInfo.user.role === 'ADMIN' &&
                        <button className={s.button}
                                onClick={() => navigate(ADMIN_ROUTE + '/' + PRODUCT_EDIT_ROUTE)}
                                type="button">
                            <img className={s.icon} src={setting} alt="Иконка настроек администратора"/>
                        </button>
                    }
                    <button className={s.button}
                            onClick={logOut}
                            type="button">
                        <img className={s.icon} src={exit} alt="Иконка выхода из системы"/>
                    </button>
                </div>
                :
                <button className={s.authBtn} onClick={() => window.location.href = process.env.REACT_APP_AUTH_APPLICATION}>
                    Авторизация
                </button>
            }
        </header>
    )
}

export default NavBar;
