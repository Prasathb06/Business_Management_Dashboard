import { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "staff"
    });


    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", form);
            alert("Register Successfully")
            navigate("/login");
        } catch (err) {
            alert("Registration failed");
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Paper elevation={3} sx={{ p: 4, width: 350 }}>
                <Typography variant="h5" mb={2} align="center">
                    Register
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        name="name"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                    />

                    <TextField
                        select
                        label="Role"
                        name="role"
                        fullWidth
                        margin="normal"
                        SelectProps={{ native: true }}
                        onChange={handleChange}
                    >
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                    </TextField>


                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                        type="submit"
                    >
                        Register
                    </Button>
                </form>

                <Typography mt={2} align="center">
                    Already have an account? <Link to="/login">Login</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Register;
