import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { Modal, Table, Button, Dropdown, Spinner, Badge } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill, BsArrowClockwise } from "react-icons/bs";
import { orderURL } from "../../api/config";
import FormOrders from "../form/FormOrders";
import axios from "axios";
//redux store
import { useDispatch } from "react-redux";
import { setLoading as setLoadingData, setTotal as setTotalData } from "../../app/orderReducer";
import OrderActions from "../action/orderActions";
import SelectBoxAction from "../action/selectBoxAction";

export default function TableOrders() {
    const [orders, setOrders] = useState([]);
    const [ordersDefault, setOrdersDefault] = useState([]);
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [orderId, setOrderId] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await axios.get(`${orderURL}/admin/all`);
                setOrders(res.data.orders);
                setOrdersDefault(res.data.orders);
                setPage(res.data.page);
                setTotal(res.data.total);
                setLimit(res.data.limit);
                dispatch(setLoadingData(true));
                dispatch(setTotalData(res.data.total));
            }
            catch (e) {
                toast.error("Failed to load data from server.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);
    const handleUpdateDialog = (order) => {
        setOrder(order);
        setShowUpdateDialog(true);
    }
    const handleDeleteDialog = (id) => {
        setOrderId(id);
        setShowDeleteDialog(true);
    }
    const handleDeleteOrder = async () => {
        try {
            setDisabled(true);
            await axios.delete(`${orderURL}/${orderId}`);
            toast.success("Delete order successfully.");
        }
        catch (e) {
            toast.error(e.message);
        }
        finally {
            setDisabled(false);
            setShowDeleteDialog(false);
        }
    }
    const resetPage = useCallback(async () => {
        const totalPage = Math.ceil(total / limit);
        if (page < 1) {
            setPage(1);
            return;
        }
        if (page > totalPage) {
            setPage(totalPage);
            return;
        }
        setLoading(true);
        try {
            const res = await axios.get(`${orderURL}/admin/all?page=${page}`);
            setOrders(res.data.orders);
            setOrdersDefault(res.data.orders);
            setTotal(res.data.total);
        }
        catch (e) {
            toast.error(e.message);
        }
        finally {
            setLoading(false);
        }
    }, [page, total, limit]);
    useEffect(() => {
        dispatch(setTotalData(total));
    }, [total, dispatch]);
    useEffect(() => {
        resetPage();
    }, [page, resetPage]);
    const sortData = [
        {
            key: 'default',
            value: 'Sort by',
        },
        {
            key: 'sortByValue',
            value: 'Sort by value',
        },
        {
            key: 'sortByDate',
            value: 'Sort by date',
        }
    ];
    const filterData = [
        {
            key: 'default',
            value: 'Filter by',
        },
        {
            key: 'all',
            value: 'All',
        },
        {
            key: 1,
            value: 'Available',
        },
        {
            key: 0,
            value: 'Unavailable',
        },
    ];
    const handleSelectChange = (data)=>{
        setOrders([...OrderActions(ordersDefault, data)]);
    }
    return (
        <>
            <div className="d-flex flex-row">
                <div className="mx-2">
                    <b
                        className="text-light" style={{ 'cursor': 'pointer' }} onClick={() => resetPage(page)}>
                        Reload <BsArrowClockwise />
                    </b>
                </div>
                <div className="ms-auto d-flex flex-row">
                    <SelectBoxAction data={filterData} select_change={(data) => handleSelectChange(data)} />
                    <SelectBoxAction data={sortData} select_change={(data) => handleSelectChange(data)} />
                </div>
            </div>
            <Table className="text-light text-center" responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User id</th>
                        <th>Orders id</th>
                        <th>Address</th>
                        <th>Value</th>
                        <th>Status</th>
                        <th>Create at</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ?
                            <tr>
                                <td colSpan="8">
                                    <Spinner animation="grow" size="sm" /> loading ...
                                </td>
                            </tr> :
                            orders?.map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{order.userId}</td>
                                        <td>{order._id}</td>
                                        <td>{order.address}</td>
                                        <td>{order.sum}</td>
                                        <td>{order.status === 1 ?
                                            <Badge bg="success">Available</Badge> :
                                            <Badge bg="danger">Unavailable</Badge>
                                        }</td>
                                        <td>{order.createdAt.slice(0, 10)}</td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle className="rounded-circle" variant="primary">
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="text-center bg-secondary">
                                                    <Button variant="success"
                                                        style={{ 'backgroundColor': '#65a30d' }}
                                                        className="mx-1"
                                                        onClick={() => handleUpdateDialog(order)}
                                                    >
                                                        <BsFillPencilFill />
                                                    </Button>
                                                    <Button variant="danger" className="mx-1"
                                                        onClick={() => handleDeleteDialog(order._id)}
                                                    >
                                                        <BsFillTrashFill />
                                                    </Button>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
            </Table>
            <div
                className="d-flex flex-row justify-content-center text-primary"
                style={{ 'cursor': 'pointer' }}
            >
                <u className="mx-2" onClick={() => setPage(page - 1)}>Previous</u>
                <p className="mx-2"> page {page} </p>
                <u className="mx-2" onClick={() => setPage(page + 1)}>Next</u>
            </div>
            <Modal show={showUpdateDialog} onHide={() => setShowUpdateDialog(false)} centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Update order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormOrders order={order} cancel={() => setShowUpdateDialog(false)} />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteDialog} onHide={() => setShowDeleteDialog(false)} centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    Are you sure ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleDeleteOrder} disabled={disabled}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}