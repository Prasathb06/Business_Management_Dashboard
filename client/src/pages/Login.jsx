import { useState, useContext } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await API.post("/auth/login", {
                email,
                password
            });
            login(res.data.user, res.data.token);
            navigate("/dashboard")
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <Paper style={{ width: 300, margin: "100px auto", padding: 20 }}>
            <Typography variant="h6" align="center">
                Login
            </Typography>

            <TextField
                fullWidth
                margin="normal"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
            >
                Login
            </Button>
            <Typography mt={2} align="center">
                Don’t have an account?<Link to="/register">Register</Link>
            </Typography>
        </Paper>
    );
};

export default Login;
