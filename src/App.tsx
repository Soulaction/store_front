import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import {useEffect} from "react";
import {message} from "antd";
import {msgShare} from "./utils/share";
import './style.css';
import {setBasketId} from "./feature/basket/basketSlice";
import {useAppDispatch} from "./feature/hooks/hooks";


const App = () => {

    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        msgShare.subscribe((msg) => {
            messageApi.error(msg);
        })
        dispatch(setBasketId('e2196ee5-b2de-41dd-a941-c4d5a653bc4f'));
        return () => {
            console.log("destroy");
        }
    }, [])

    return (
        <BrowserRouter>
            {contextHolder}
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    )
}

export default App;
