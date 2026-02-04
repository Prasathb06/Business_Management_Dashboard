import { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import API from "../services/api";
import SalesChart from "../components/SalesChart";

const Dashboard = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get("/dashboard/stats");
                setStats(res.data);
            } catch (err) {
                setError("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <Layout><Loader /></Layout>;
    if (error) return <Layout><ErrorMessage message={error} /></Layout>;

    const chartData = [
        { name: "Products", value: stats.totalProducts || 0 },
        { name: "Orders", value: stats.totalOrders || 0 },
        { name: "Delivered", value: stats.deliveredOrders || 0 },
        { name: "Revenue", value: stats.totalRevenue || 0 }
    ];

    return (
        <Layout>
            <Grid container spacing={2}>

                <Grid item xs={12} md={3}>
                    <Paper style={{ padding: 20 }}>
                        <Typography>Total Products</Typography>
                        <Typography variant="h5">{stats.totalProducts}</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper style={{ padding: 20 }}>
                        <Typography>Total Orders</Typography>
                        <Typography variant="h5">{stats.totalOrders}</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper style={{ padding: 20 }}>
                        <Typography>Revenue</Typography>
                        <Typography variant="h5">₹{stats.totalRevenue}</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper style={{ padding: 20 }}>
                        <Typography>Pending</Typography>
                        <Typography variant="h5">{stats.pendingOrders}</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper style={{ padding: 20 }}>
                        <Typography variant="h6" gutterBottom>
                            Business Overview
                        </Typography>
                        <SalesChart data={chartData} />
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Dashboard;
