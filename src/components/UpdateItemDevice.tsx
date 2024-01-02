import { observer } from "mobx-react-lite";
import {FC, useContext, useEffect} from "react";
import { ContextApp } from "../index";
import { Button } from "react-bootstrap"
import { fetchDevices, deleteDevice } from "../http/deviceAPI";
import {Device} from "../model/Device";

export interface UpdateItemDeviceProps {
    key: any,
    device: Device
}

const UpdateItemDevice: FC<UpdateItemDeviceProps> = observer(({device}) => {

    const { deviceStore, brandsStore } = useContext(ContextApp)

    const brand = brandsStore.brands.filter((brand) => brand.id == device.brandId)
    const deleteItem = async () => {
        await deleteDevice (device.id)
        fetchDevices(null, null, deviceStore.page, deviceStore.limit).then(data => {
            deviceStore.setDevices(data.rows)
            deviceStore.setTotalCount(data.count)
        })
    }

    useEffect(() => {
        fetchDevices(null, null, deviceStore.page, deviceStore.limit).then(data => {
            deviceStore.setDevices(data.rows)
            deviceStore.setTotalCount(data.count)
        })
    }, [deviceStore.page])

    return (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '15px' }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <img style={{ width: '50px', height: '50px', marginRight: '10px' }} src={process.env.REACT_APP_API_URL + device.img} />
                <span>{brand[0].name}  {device.name}</span>
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
