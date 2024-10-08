import {useEffect, useState} from "react";
import {Type} from "../../model/Type";
import {fetchTypes} from "../../http/types-http";
import TypeProductItem from "../../components/TypeProductItem/TypeProductItem";
import s from './Main.module.css'


const Main = () => {
    const [types, setTypes] = useState<Type[]>();

    useEffect(() => {
        fetchTypes().then(({data}) => {
            setTypes(data);
        }).catch(e => console.log(e));
    }, []);

    return (
        <main className={s.container}>
            {types && types.map(type => (
                    <TypeProductItem key={type.id} type={type}/>
            ))}
        </main>
    );
}

export default Main;
