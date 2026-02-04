import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { logout } = useContext(AuthContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Business Dashboard
                </Typography>
                <Button color="inherit" onClick={logout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
