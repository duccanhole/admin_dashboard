import { useState, useEffect } from "react";
import { Button, Modal} from "react-bootstrap";
import FormAddNew from "../component/form/FormAddProduct";
import FormAddType from "../component/form/FormAddType";
import TableProduct from "../component/table/TableProducts";

export default function Product(props) {
    const [addProduct, setAddProduct] = useState(false);
    const [addType, setAddType] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        if (reload) {
            setReload(false);
        }
    }, [reload]);

    return (
        <div className="pt-5 pb-4 tab background">
            <div className="d-inline text-light">
                <Button variant="outline-primary"
                    style={{ 'backgroundColor': '#2f3ab2' }} className='text-light ms-2 mt-1'
                    onClick={() => setAddProduct(true)}>
                    ADD NEW PRODUCT
                </Button>
                <Button variant="outline-primary"
                    style={{ 'backgroundColor': '#2f3ab2' }} className='text-light ms-2 mt-1'
                    onClick={() => setAddType(true)}
                    >
                    ADD NEW TYPE
                </Button>
                <Button variant="outline-primary"
                    style={{ 'backgroundColor': '#2f3ab2' }} className='text-light ms-2 mt-1'
                    onClick={() => setAddType(true)}
                    >
                    REMOVE TYPE
                </Button>
            </div>
            <Modal show={addProduct} onHide={() => setAddProduct(false)} size="lg" centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Add new product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormAddNew
                        cancel={(data) => setAddProduct(data)}
                        reload={(data) => setReload(data)}
                    />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <Modal show={addType} onHide={() => setAddType(false)} size="md" centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Add new type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormAddType/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <div className="bg-box mt-3 mx-2 rounded">
                <TableProduct reload={reload}/>
            </div>
        </div>
    );
}