import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import API from "../services/api";
import Layout from "../components/Layout";

const Orders = () => {
    const [orders, setOrders] = useState([]);


    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const fetchOrders = async () => {
        const res = await API.get("/orders");
        setOrders(res.data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id) => {
        await API.put(`/orders/${id}`, {
            status: "Delivered"
        });
        fetchOrders();
    };

    return (
        <Layout>
            <Paper style={{ padding: 20 }}>
                <Typography variant="h6">Orders</Typography>
                {role === "admin" && (
                    <Button variant="contained">
                        Create Order
                    </Button>
                )}

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Products</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>
                                    {order.products.map((p, i) => (
                                        <div key={i}>
                                            {p.productId?.title} × {p.quantity}
                                        </div>
                                    ))}
                                </TableCell>

                                <TableCell>₹{order.totalAmount}</TableCell>
                                <TableCell>{order.status}</TableCell>

                                <TableCell>
                                    {order.status === "Pending" && (
                                        <Button
                                            variant="contained"
                                            onClick={() => updateStatus(order._id)}
                                        >
                                            Mark Delivered
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Layout>
    );
};

export default Orders;
