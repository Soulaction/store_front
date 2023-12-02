import { useContext } from "react"
import { Context } from "../index"


const OrderItem = (props) => {

    const { device } = useContext(Context)
    const selBrand = device.brands.filter((brand) => brand.id === props.order.device.brandId)

    return (
        <tr>
        <td>{props.order.id}</td>
        <td>{`${selBrand[0].name} ${props.order.device.name}`}</td>
        <td>{props.order.statusPayment}</td>
        <td>{props.order.statusOrder}</td>
        </tr>
        
    )
}

export default OrderItem;