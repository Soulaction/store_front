import {observer} from "mobx-react-lite";
import {FC} from "react";
import {deleteBasket} from "../../../http/basket-http";
import {Device} from "../../../model/Device";

export interface BasketItemProps {
    device: Device,
}

const BasketItem: FC<BasketItemProps> = observer(({device}) => {

    const deleteItem = async () => {
        await deleteBasket(device.id)
    }

    return (
        <div>

        </div>
    )


})

export default BasketItem;
