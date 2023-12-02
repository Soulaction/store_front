import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { fetchProduct } from "../http/basketApi";
import { Context } from "../index";
import {Row, Container} from "react-bootstrap"
import BasketItem from "../components/BasketItem";

const Basket = observer(() => {
    const { basket } = useContext(Context)
    const { user } = useContext(Context)

    useEffect(() => {
        fetchProduct(user.user.id).then(data => basket.setProducts(data))

    }, [])
    console.log(basket.products)
    return (
        <Container>
            <Row className="mt-3">
                {basket.products.map(el => 
                <BasketItem key={el.id} idDB={el.id} devices={el.device}/>)}
            </Row>
        </Container>
    )
})

export default Basket;