import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from "@mui/material";
import { useState, useEffect } from "react";
import API from "../services/api";

const EditProductModal = ({ open, handleClose, product, refresh }) => {
    const [form, setForm] = useState({
        title: "",
        price: "",
        category: ""
    });

    useEffect(() => {
        if (product) {
            setForm({
                title: product.title,
                price: product.price,
                category: product.category
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        await API.put(`/products/${product._id}`, form);
        refresh();
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Edit Product</DialogTitle>

            <DialogContent>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="dense"
                    label="Price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="dense"
                    label="Category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProductModal;
