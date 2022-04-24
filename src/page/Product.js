import { useState } from "react";
import { Button, Modal} from "react-bootstrap";
import FormAddNew from "../component/form/FormAddProduct";
import FormAddType from "../component/form/FormAddType";
import TableProduct from "../component/table/TableProducts";

export default function Product() {
    const [addProduct, setAddProduct] = useState(false);
    const [addType, setAddType] = useState(false);
    return (
        <div className="pt-5 pb-4 tab background">
            <div className="d-inline text-light">
                <Button variant="outline-primary"
                    style={{ 'backgroundColor': '#2f3ab2' }} className='text-light ms-2'
                    onClick={() => setAddProduct(true)}>
                    ADD NEW PRODUCT
                </Button>
                <Button variant="outline-primary"
                    style={{ 'backgroundColor': '#2f3ab2' }} className='text-light ms-2'
                    onClick={() => setAddType(true)}
                    >
                    ADD NEW TYPE
                </Button>
                {/*<span className="float-end me-2">
                    <select className="form-control d-inline" defaultValue='default'>
                        <option value='default' disabled>Sort By</option>
                        <option>All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </span>
                <span className="float-end me-2">
                    <select className="form-control d-inline" defaultValue='default'>
                        <option value='default' disabled>Filter By</option>
                        <option>All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </span>*/}
            </div>
            <Modal show={addProduct} onHide={() => setAddProduct(false)} size="lg" centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Add new product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormAddNew
                        cancel={(data) => setAddProduct(data)}
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
                <TableProduct/>
            </div>
        </div>
    );
}