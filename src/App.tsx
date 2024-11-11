import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import {useEffect} from "react";
import {message} from "antd";
import {msgShare} from "./utils/share";
import './style.css';
import {useAppDispatch} from "./feature/hooks/hooks";
import {fetchUser} from "./feature/user/userThunk";

const App = () => {

    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    useEffect(() => {
        msgShare.subscribe((msg) => {
            messageApi.error(msg);
        });
    }, []);

    return (
        <BrowserRouter>
            {contextHolder}
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    )
}

export default App;
