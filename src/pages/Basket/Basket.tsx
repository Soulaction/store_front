import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {fetchBasketProduct} from "../../http/basket-http";
import {errorHandler} from "../../utils/utils";
import BasketItem from "./components/BasketItem";
import {BasketItemModel} from "../../model/BasketItemModel";
import s from "./Basket.module.css";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {PRODUCTS_ROUTE} from "../../components/AppRouter/consts";

const Basket = observer(() => {

    const [basketItems, setBasketItems] = useState<BasketItemModel[]>([]);
    const [sum, setSum] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        refreshData();

    }, [])

    const refreshData = () => {
        fetchBasketProduct('e2196ee5-b2de-41dd-a941-c4d5a653bc4f').then(({data}) => {
            setBasketItems(data);
            setSum(data.reduce((sum, el) => sum + el.device.price, 0));
        }).catch(errorHandler);
    }

    return (
        <main className={s.basket}>
            <h1 className={s.basketHeader}>Корзина</h1>
            {
                basketItems.length ?
                    <>
                        <ul className={s.listItems}>
                            {
                                basketItems.map(item => <BasketItem key={item.id} basketItem={item} refresh={refreshData}/>)
                            }
                        </ul>
                        <p className={s.sumName}>Итого <span className={s.sumPrice}>{sum + ' ₽'}</span></p>
                        <Button className={s.basketBtn}>Перейти к оформлению заказа</Button>
                    </>
                    :
                    <>
                        <h2 className={s.msgEmpty}>Ваша корзина пуста</h2>
                        <Button className={s.basketBtn} onClick={() => navigate(PRODUCTS_ROUTE)}>Перейти в каталог</Button>
                    </>
            }
        </main>
    )
})

export default Basket;
