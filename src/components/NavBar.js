import { React, useContext } from "react";
import { Context } from "../index";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite"
import { ADMIN_ROUTE, LOGIN_ROUTE, BASKET_ROUTE, STORE_KEEPER_ROUTE } from '../utils/consts'
import basket from "../image/basket.png"


const NavBar = observer(() => {
    const { user } = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setIsAuth(false)
        user.setIsUser({})
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>Магазин</NavLink>
                {user.isAuth ?
                    user.user.role === 'ADMIN' ?
                        <Nav className="ml-auto" style={{ color: "white" }}>
                            <button style={{
                                background: `url(${basket}) no-repeat center center`,
                                width: 40, height: 40, backgroundSize: 'cover',
                                border: 0, marginRight: '20px'
                            }}
                                onClick={() => history.push(BASKET_ROUTE + '/' + user.user.id)}>
                            </button>
                            <Button className="me-2" variant={"outline-light"} onClick={() => history.push(ADMIN_ROUTE)}>Админ панель</Button>
                            <Button className="ml-2" variant={"outline-light"} onClick={() => logOut()}>Выйти</Button>
                        </Nav>
                        : user.user.role === 'STOREKEEPER' ?
                            <Nav className="ml-auto" style={{ color: "white" }}>
                                <button style={{
                                    background: `url(${basket}) no-repeat center center`,
                                    width: 40, height: 40, backgroundSize: 'cover',
                                    border: 0, marginRight: '20px'
                                }}
                                    onClick={() => history.push(BASKET_ROUTE + '/' + user.user.id)}>
                                </button>
                                <Button className="me-2" variant={"outline-light"} onClick={() => history.push(STORE_KEEPER_ROUTE)}>Панель заказов</Button>
                                <Button className="ml-2" variant={"outline-light"} onClick={() => logOut()}>Выйти</Button>
                            </Nav>
                            :
                            
                            <Nav className="ml-auto" style={{ color: "white" }}>
                                    <button style={{
                                    background: `url(${basket}) no-repeat center center`,
                                    width: 40, height: 40, backgroundSize: 'cover',
                                    border: 0, marginRight: '20px'
                                }}
                                    onClick={() => history.push(BASKET_ROUTE + '/' + user.user.id)}>
                                </button>
                                <Button className="ml-2" variant={"outline-light"} onClick={() => logOut()}>Выйти</Button>
                            </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: "white" }}>
                        <Button variant="outline-light" onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>)
})

export default NavBar;