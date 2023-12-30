import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { fetchProduct } from "../http/basketApi";
import { ContextApp } from "../index";
import {Row, Container} from "react-bootstrap"
import BasketItem from "../components/BasketItem";

const Basket = observer(() => {
    const { userStore, basketStore } = useContext(ContextApp);

    useEffect(() => {
        fetchProduct(userStore.user.id).then(data => basketStore.setProductsUser(data))

    }, [])
    return (
        <Container>
            <Row className="mt-3">
                {basketStore.productsUser.map(el =>
                <BasketItem key={el.id} device={el}/>)}
            </Row>
        </Container>
    )
})

export default Basket;
