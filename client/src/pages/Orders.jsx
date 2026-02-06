import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Select, MenuItem, Box } from "@mui/material";
import API from "../services/api";
import Layout from "../components/Layout";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const fetchOrders = async () => {
        try {
            const res = await API.get("/orders");
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchStaff = async () => {
        const res = await API.get("/users?role=staff");
        setStaffList(res.data);
    };

    useEffect(() => {
        fetchOrders();
        if (role === "admin") {
            fetchStaff();
        }
    }, []);


    const updateStatus = async (orderId, status) => {
        try {
            await API.put(`/orders/${orderId}`, { status });
            fetchOrders();
        } catch (err) {
            alert("Status update failed");
        }
    };

    return (
        <Layout>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" mb={2}>
                    Orders
                </Typography>

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
                                        <Box key={i}>
                                            {p.productId?.title} × {p.quantity}
                                        </Box>
                                    ))}
                                </TableCell>

                                <TableCell>₹{order.totalAmount}</TableCell>

                                <TableCell>
                                    <TableCell>
                                        {(role === "admin" || role === "staff") && (
                                            <Select
                                                size="small"
                                                value={order.status}
                                                onChange={(e) => updateStatus(order._id, e.target.value)}
                                            >
                                                <MenuItem value="Pending">Pending</MenuItem>
                                                <MenuItem value="Processing">Processing</MenuItem>
                                                <MenuItem value="Shipped">Shipped</MenuItem>
                                                <MenuItem value="Delivered">Delivered</MenuItem>
                                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                                            </Select>
                                        )}
                                    </TableCell>
                                </TableCell>

                                <TableCell>
                                    {role === "admin" ? "Editable" : "View Only"}
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
