import {useEffect, useState} from "react";
import BasketItem from "./components/BasketItem";
import {BasketItemModel} from "../../model/BasketItemModel";
import s from "./Basket.module.css";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {PRODUCTS_ROUTE} from "../../components/AppRouter/consts";
import {useAppDispatch, useAppSelector} from "../../feature/hooks/hooks";
import {fetchBasketItems} from "../../feature/basket/basketThunk";

const Basket = () => {

    const [sum, setSum] = useState<number>(0);
    const navigate = useNavigate();
    const basketItems: BasketItemModel[] = useAppSelector(state => state.basket.basketItems);
    const dispatch = useAppDispatch();
    useEffect(() => {
        refreshData();
        },[])

    useEffect(() => {
        setSum(basketItems.reduce((sum, el) => sum + el.price, 0));
    }, [basketItems])

    const refreshData = () => {
        dispatch(fetchBasketItems());
    }

    return (
        <main className={s.basket}>
            <h1 className={s.basketHeader}>Корзина</h1>
            {
                basketItems.length ?
                    <>
                        <ul className={s.listItems}>
                            {
                                basketItems.map(item => <BasketItem key={item.idBasketItem} basketItem={item}/>)
                            }
                        </ul>
                        <p className={s.sumName}>Итого <span className={s.sumPrice}>{sum + ' ₽'}</span></p>
                        <Button className={s.basketBtn}>Перейти к оформлению заказа</Button>
                    </>
                    :
                    <>
                        <h2 className={s.msgEmpty}>Ваша корзина пуста</h2>
                        <Button className={s.basketBtn} onClick={() => navigate(PRODUCTS_ROUTE)}>Перейти в
                            каталог</Button>
                    </>
            }
        </main>
    )
};

export default Basket;
