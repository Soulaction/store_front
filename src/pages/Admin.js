import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateUser from "../components/modals/CreateUser";
import UpdateInfomationDevice from "../components/modals/UpdateInfomationDevice";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [userVisible, setUserVisible] = useState(false)
const [informationVisible, setInformationVisible] = useState(false)

    return (
    <Container className="d-flex flex-column">
        <Button variant={"outline-dark"} className="mt-2" onClick={()=> setTypeVisible(true)}>Добавить тип</Button>
        <Button variant={"outline-dark"} className="mt-2" onClick={()=> setBrandVisible(true)}>Добавить бренд</Button>
        <Button variant={"outline-dark"} className="mt-2" onClick={()=> setDeviceVisible(true)}>Добавить устройство</Button>
        <Button variant={"outline-dark"} className="mt-2" onClick={()=> setInformationVisible(true)}>Удалить товар</Button>
        <Button variant={"outline-dark"} className="mt-2" onClick={()=> setUserVisible(true)}>Добавить пользователя</Button>
        
        <CreateType show={typeVisible} onHide={()=> setTypeVisible(false)}/>
        <CreateBrand show={brandVisible} onHide={()=> setBrandVisible(false)}/>
        <CreateDevice show={deviceVisible} onHide={()=> setDeviceVisible(false)}/>
        <UpdateInfomationDevice show={informationVisible} onHide={()=> setInformationVisible(false)}/>
        <CreateUser show={userVisible} onHide={()=> setUserVisible(false)}/>
    </Container>
    )
}

export default Admin;