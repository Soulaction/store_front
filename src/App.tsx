import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {message} from "antd";
import {msgShare} from "./utils/share";
import './style.css';


const App = observer(() => {

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        msgShare.subscribe((msg) => {
            messageApi.error(msg);
        })
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
})

export default App;
