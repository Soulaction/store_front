import { useContext, useState } from "react";
import { observer } from "mobx-react-lite"
import { Button } from "react-bootstrap";
import { Card, Container, Form, Row } from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import { login, registration } from "../http/user-http";
import { ContextApp } from "../index"
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../components/AppRouter/consts";

const Auth = observer(() => {
    const {userStore} = useContext(ContextApp)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const click = async () => {

        try {
            let date;
            if (isLogin) {
                date = await login(email, password)
                userStore.setIsUser(date)
                userStore.setIsAuth(true)
                navigate(SHOP_ROUTE)
            } else {
                date = await registration(email, password)
                navigate(LOGIN_ROUTE)
            }
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h1 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h1>
                <Form>
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div style={{marginBottom: '0.5em'}}>
                                <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                            </div>
                            :
                            <div style={{marginBottom: '0.5em'}}>
                                <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        <div>

                            <Button variant={"outline-success"}
                                onClick={click}
                            >
                                {isLogin ? 'Войти' : 'Регистрация'
                                }
                            </Button>


                        </div>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth;
