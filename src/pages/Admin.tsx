import {useState} from "react";
import {Button, Container} from "react-bootstrap";
import CreateDevice from "../components/modals/CreateDevice";
import CreateBrand from "../components/modals/CreateBrand";
import UpdateInformationDevice from "../components/modals/UpdateInfomationDevice";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState<boolean>(false)
    const [typeVisible, setTypeVisible] = useState<boolean>(false)
    const [deviceVisible, setDeviceVisible] = useState<boolean>(false)
    const [userVisible, setUserVisible] = useState<boolean>(false)
    const [informationVisible, setInformationVisible] = useState<boolean>(false)

    return (
        <Container className="d-flex flex-column">
            <Button variant={"outline-dark"} className="mt-2" onClick={() => setTypeVisible(true)}>Добавить тип</Button>
            <Button variant={"outline-dark"} className="mt-2" onClick={() => setBrandVisible(true)}>Добавить
                бренд</Button>
            <Button variant={"outline-dark"} className="mt-2" onClick={() => setDeviceVisible(true)}>Добавить
                устройство</Button>
            <Button variant={"outline-dark"} className="mt-2" onClick={() => setInformationVisible(true)}>Удалить
                товар</Button>
            <Button variant={"outline-dark"} className="mt-2" onClick={() => setUserVisible(true)}>Добавить
                пользователя</Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <UpdateInformationDevice show={informationVisible} onHide={() => setInformationVisible(false)}/>
            {/*<CreateUser show={userVisible} onHide={()=> setUserVisible(false)}/>*/}
        </Container>
    )
}

export default Admin;
