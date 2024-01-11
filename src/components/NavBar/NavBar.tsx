import {useContext} from "react";
import {ContextApp} from "../../index";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import arrowDown from "../../assets/down_arrow..svg";
import analysis from "../../assets/analysis.svg";
import like from "../../assets/like.svg";
import basket from "../../assets/basket.svg";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, STORE_KEEPER_ROUTE} from "../AppRouter/consts";
import {Avatar, Button} from "@mui/material";
import s from './NavBar.module.css';


const NavBar = observer(() => {
    const {userStore} = useContext(ContextApp)
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
                        <img className={s.icon} src={analysis} alt="Иконка сравнения товара"/>
                    </button>
                    <button className={s.button} type="button">
                        <img className={s.icon} src={like} alt="Иконка сравнения товара"/>
                    </button>
                    <button className={s.button} type="button">
                        <img className={s.icon} src={basket} alt="Иконка корзины"/>
                    </button>
                    <Avatar/>
                    <button className={s.button + ' ' + s.arrowDownButton} type="button">
                        <img className={s.arrowDownIcon} src={arrowDown} alt="Иконка меню"/>
                    </button>
                </div>
                :
                <NavLink className={s.link} to={LOGIN_ROUTE}>
                    <Button color="primary"
                            variant="outlined">
                        Авторизация
                    </Button>
                </NavLink>
            }
        </header>)
})

export default NavBar;
