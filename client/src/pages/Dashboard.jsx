import { useEffect, useState } from "react";
import { Paper, Typography, Grid } from "@mui/material";
import API from "../services/api";
import Layout from "../components/Layout";
import SalesChart from "../components/SalesChart";


const Dashboard = () => {
    const [stats, setStats] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const fetchStats = async () => {
        const res = await API.get("/dashboard");
        setStats(res.data);
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <Layout>
            {role === "admin" && (
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Monthly Sales</Typography>
                        <SalesChart />
                    </Paper>
                </Grid>
            )}

            <Grid container spacing={2}>
                {role === "admin" ? (
                    <>
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 2 }}>
                                <Typography>Total Orders</Typography>
                                <Typography variant="h5">{stats.totalOrders}</Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 2 }}>
                                <Typography>Total Products</Typography>
                                <Typography variant="h5">{stats.totalProducts}</Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 2 }}>
                                <Typography>Total Staff</Typography>
                                <Typography variant="h5">{stats.totalStaff}</Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 2 }}>
                                <Typography>Total Revenue</Typography>
                                <Typography variant="h5">₹{stats.totalRevenue}</Typography>
                            </Paper>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                                <Typography>Assigned Orders</Typography>
                                <Typography variant="h5">{stats.assignedOrders}</Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                                <Typography>Delivered Orders</Typography>
                                <Typography variant="h5">{stats.deliveredOrders}</Typography>
                            </Paper>
                        </Grid>
                    </>
                )}
            </Grid>
        </Layout>
    );
};

export default Dashboard;
