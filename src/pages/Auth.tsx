import {useState} from "react";

import {useLocation, useNavigate} from "react-router-dom";
import {login, registration} from "../http/user-http";
import {LOGIN_ROUTE, SHOP_ROUTE} from "../components/AppRouter/consts";

const Auth = () => {
    const userStore = {setIsUser: (data) => {}, setIsAuth: (data) => {} }
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
        <div>
        </div>
    )
};

export default Auth;
