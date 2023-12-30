import { useContext } from "react"
import { ContextApp } from "../index"


const OrderItem = (props) => {

    const { brandsStore } = useContext(ContextApp)
    const selBrand = brandsStore.brands.filter((brand) => brand.id === props.order.device.brandId)

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
