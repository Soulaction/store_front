import {observer} from "mobx-react-lite";
import {FC, useContext, useEffect, useState} from "react";
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {createDevice, fetchBrands} from "../../http/deviceAPI";
import {ContextApp} from "../../index"
import {fetchTypes} from "../../http/types-http";

export interface CreateDeviceProps {
    show: boolean,
    onHide: () => void
}

const CreateDevice: FC<CreateDeviceProps> = observer(({ show, onHide }) => {
    const { typesStore, brandsStore } = useContext(ContextApp)
    const [name, setName] = useState('')
    const [price, setPrice] = useState<number>()
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(()=> {
        fetchTypes().then(data => typesStore.setTypes(data))
        fetchBrands().then(data => brandsStore.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i =>
            i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        console.log({...info, [key]: value})
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }


    const selectedFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', brandsStore.selectedBrand.id.toString())
        formData.append('typeId', typesStore.selectedType.id.toString())
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mb-2 mt-2">
                        <Dropdown.Toggle>{typesStore.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {typesStore.types.map(el =>
                                <Dropdown.Item onClick={() => typesStore.setTypes(el)} key={el.id}>{el.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mb-2 mt-2">
                        <Dropdown.Toggle>{brandsStore.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brandsStore.brands.map(el =>
                                <Dropdown.Item onClick={() => brandsStore.setSelectedBrand(el)} key={el.id}>{el.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e=> setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название устройства"
                    />
                    <Form.Control
                        value={price}
                        onChange={e=> setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectedFile}
                    />
                    <hr />
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {
                        info.map(i =>
                            <Row className="mt-4" key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                        placeholder="Введите название свойства"
                                    />

                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.discription}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                        placeholder="Введите описание свойства"
                                    />

                                </Col>
                                <Col md={4}>
                                    <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                    >Удалить</Button>

                                </Col>
                            </Row>
                        )
                    }

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateDevice;


