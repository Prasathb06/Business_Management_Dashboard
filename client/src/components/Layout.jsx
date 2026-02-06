import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    const { logout } = useContext(AuthContext);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Navbar />
                <div style={{ padding: 20 }}>{children}</div>
            </div>
            <Button
                variant="outlined"
                color="error"
                onClick={logout}
                sx={{ position: "absolute", top: 10, right: 20 }}
            >
                Logout
            </Button>

        </div>
    );
};

export default Layout;
