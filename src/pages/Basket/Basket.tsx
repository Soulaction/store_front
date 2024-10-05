import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {fetchBasketProduct} from "../../http/basket-http";
import {errorHandler} from "../../utils/utils";
import {BasketItem} from "../../model/BasketItem";

const Basket = observer(() => {

    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

    useEffect(() => {
        fetchBasketProduct('e2196ee5-b2de-41dd-a941-c4d5a653bc4f').then(({data}) => {
            console.log(data);
            setBasketItems(data);
        }).catch(errorHandler);

    }, [])
    return (
        <main>

        </main>
    )
})

export default Basket;
