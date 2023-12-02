import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { Button } from "react-bootstrap"
import { fetchDevices, deleteDevice } from "../http/deviceAPI";
import ViewStatusOrder from "./modals/ViewStatusOrder";


const UpdateItemDevice = observer((props) => {

    const { device } = useContext(Context)
    const [updateDate, setUpdateDate] = useState(false)

    const brand = device.brands.filter((brand) => brand.id == props.device.brandId)
    const deleteItem = async () => {
        await deleteDevice (props.deviceId)
        fetchDevices(null, null, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }

    useEffect(() => {
        fetchDevices(null, null, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page])


    console.log()
    return (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '15px' }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <img style={{ width: '50px', height: '50px', marginRight: '10px' }} src={process.env.REACT_APP_API_URL + props.device.img} />
                <span>{brand[0].name}  {props.device.name}</span>
            </div>
            <div>
                {/* <Button className="me-2" variant={"success"} onClick={() => setUpdateDate(true)}>Изменить информацию</Button>
                <ViewStatusOrder show={updateDate} onHide={() => setUpdateDate(false)} /> */}
                <Button variant={"danger"}
                  onClick={deleteItem}  
                >Удалить товар</Button>
            </div>
        </div>
    )


})

export default UpdateItemDevice;