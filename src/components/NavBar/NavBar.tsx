import React, {useContext} from "react";
import {ContextApp} from "../../index";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import setting from "../../assets/setting.svg";
import basket from "../../assets/basket.svg";
import {ADMIN_ROUTE, LOGIN_ROUTE, PRODUCT_EDIT_ROUTE, SHOP_ROUTE} from "../AppRouter/consts";
import {Button} from "@mui/material";
import s from './NavBar.module.css';


const NavBar = observer(() => {
    const {userStore} = useContext(ContextApp);
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
                    <button className={s.button} type="button">
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
                    <Button color="primary"
                            variant="outlined">
                        Авторизация
                    </Button>
                </NavLink>
            }
        </header>)
})

export default NavBar;
