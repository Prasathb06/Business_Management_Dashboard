import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    return (
        <Drawer variant="permanent">
            <List sx={{ width: 220 }}>


                <ListItem disablePadding>
                    <ListItemButton onClick={() =>
                        role === "admin"
                            ? navigate("/dashboard")
                            : navigate("/staff")
                    }>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>


                {role === "admin" && (
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/products")}>
                            <ListItemText primary="Products" />
                        </ListItemButton>
                    </ListItem>
                )}


                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/orders")}>
                        <ListItemText primary="Orders" />
                    </ListItemButton>
                </ListItem>

            </List>
        </Drawer>
    );
};

export default Sidebar;
