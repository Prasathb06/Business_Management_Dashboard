import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    return (
        <Drawer variant="permanent">
            <List style={{ width: 220 }}>
                <ListItem button onClick={() => navigate("/")}>
                    <ListItemText primary="Dashboard" />
                </ListItem>

                {
                    role === "admin" && (
                        <ListItem button onClick={() => navigate("/products")}>
                            <ListItemText primary="Products" />
                        </ListItem>
                    )
                }

                <ListItem button onClick={() => navigate("/orders")}>
                    <ListItemText primary="Orders" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
