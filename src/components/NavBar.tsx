import {useContext} from "react";
import {ContextApp} from "../index";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Container, Nav, Navbar} from 'react-bootstrap'
import {observer} from "mobx-react-lite"
import basket from "../image/basket.png"
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, STORE_KEEPER_ROUTE} from "./AppRouter/consts";


const NavBar = observer(() => {
    const { userStore } = useContext(ContextApp)
    const navigate = useNavigate()

    const logOut = () => {
        userStore.setIsAuth(false)
        userStore.setIsUser({})
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>Магазин</NavLink>
                {userStore.isAuth ?
                    userStore.user.role === 'ADMIN' ?
                        <Nav className="ml-auto" style={{ color: "white" }}>
                            <button style={{
                                background: `url(${basket}) no-repeat center center`,
                                width: 40, height: 40, backgroundSize: 'cover',
                                border: 0, marginRight: '20px'
                            }}
                                onClick={() => navigate(BASKET_ROUTE + '/' + userStore.user.id)}>
                            </button>
                            <Button className="me-2" variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
                            <Button className="ml-2" variant={"outline-light"} onClick={() => logOut()}>Выйти</Button>
                        </Nav>
                        : userStore.user.role === 'STOREKEEPER' ?
                            <Nav className="ml-auto" style={{ color: "white" }}>
                                <button style={{
                                    background: `url(${basket}) no-repeat center center`,
                                    width: 40, height: 40, backgroundSize: 'cover',
                                    border: 0, marginRight: '20px'
                                }}
                                    onClick={() => navigate(BASKET_ROUTE + '/' + userStore.user.id)}>
                                </button>
                                <Button className="me-2" variant={"outline-light"} onClick={() => navigate(STORE_KEEPER_ROUTE)}>Панель заказов</Button>
                                <Button className="ml-2" variant={"outline-light"} onClick={() => logOut()}>Выйти</Button>
                            </Nav>
                            :

                            <Nav className="ml-auto" style={{ color: "white" }}>
                                    <button style={{
                                    background: `url(${basket}) no-repeat center center`,
                                    width: 40, height: 40, backgroundSize: 'cover',
                                    border: 0, marginRight: '20px'
                                }}
                                    onClick={() => navigate(BASKET_ROUTE + '/' + userStore.user.id)}>
                                </button>
                                <Button className="ml-2" variant={"outline-light"} onClick={() => logOut()}>Выйти</Button>
                            </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: "white" }}>
                        <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>)
})

export default NavBar;
