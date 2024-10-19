import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {STORE_KEEPER_ROUTE} from "../components/AppRouter/consts";

const Keeper = () => {

    const navigate = useNavigate()
    const [changeStatusVisible, setStatusVisible] = useState(false)

    useEffect(() => {
    }, [])

    const allSelect = async () => {
        navigate(STORE_KEEPER_ROUTE)
    }

    const paymantSelect = async () => {
        navigate(STORE_KEEPER_ROUTE)
    }

    const sendSelect = async () => {
        navigate(STORE_KEEPER_ROUTE)
    }

    const seerch = async (id) => {
        navigate(STORE_KEEPER_ROUTE)
    }

    return (
        <div>
        </div>
    )
};

export default Keeper;
