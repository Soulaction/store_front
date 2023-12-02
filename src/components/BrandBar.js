import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Context } from "../index"
import { Card } from 'react-bootstrap'



const BrandBar = observer(() => {
    const { device } = useContext(Context)
    return (
        <div className="d-flex mt-3"
        style={{cursor: 'pointer'}}>
                {device.brands.map(brand => (
                    <Card
                        style={{backgroundcolor: "gray"}}
                        className="p-3"
                        key={brand.id}
                        border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                        onClick={() => device.setSelectedBrand(brand)}
                    >
                        {brand.name}
                    </Card>
                ))}
        </div>
    )
})

export default BrandBar;