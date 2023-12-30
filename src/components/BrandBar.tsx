import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { ContextApp } from "../index"
import { Card } from 'react-bootstrap'



const BrandBar = observer(() => {
    const { brandsStore } = useContext(ContextApp);
    console.log(brandsStore);
    return (
        <div className="d-flex mt-3"
        style={{cursor: 'pointer'}}>
                {brandsStore.brands.length !== 0 && brandsStore.brands.map(brand => (
                    <Card
                        style={{backgroundColor: "gray"}}
                        className="p-3"
                        key={brand.id}
                        border={brand.id === brandsStore.selectedBrand?.id ? 'danger' : 'light'}
                        onClick={() => brandsStore.setSelectedBrand(brand)}
                    >
                        {brand.name}
                    </Card>
                ))}
        </div>
    )
})

export default BrandBar;
