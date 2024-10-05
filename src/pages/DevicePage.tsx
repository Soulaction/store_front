import {useContext, useEffect} from "react";
import {Container} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {ContextApp} from "../index";
import {observer} from "mobx-react-lite";


const DevicePage = observer(() => {
    const { userStore } = useContext(ContextApp)
    const { id } = useParams()

    useEffect(() => {
        // fetchOneDevice(id).then(data => setDeviceNew(data) )
    }, [])

    return (
        <Container className="mt-3">

        </Container >
    )
})

export default DevicePage;
