import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Typography } from "@mui/material";
import API from "../services/api";
import Layout from "../components/Layout";
import EditProductModal from "../components/EditProductModal";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const fetchProducts = async () => {
        const res = await API.get("/products");
        setProducts(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async () => {
        if (!title || !price) return alert("Enter details");

        await API.post("/products", {
            title,
            price,
            stock
        });

        setTitle("");
        setPrice("");
        setStock("");
        fetchProducts();
    };

    const deleteProduct = async (id) => {
        await API.delete(`/products/${id}`);
        fetchProducts();
    };

    return (
        <Layout>
            <Paper style={{ padding: 20 }}>
                <Typography variant="h6">Products</Typography>
                <div style={{ display: "flex", gap: 10, margin: "15px 0" }}>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        label="Stock"
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                    <Button variant="contained" onClick={addProduct}>
                        Add
                    </Button>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {products.map((p) => (
                            <TableRow key={p._id}>
                                <TableCell>{p.title}</TableCell>
                                <TableCell>₹{p.price}</TableCell>
                                <TableCell>{p.stock}</TableCell>
                                <TableCell>
                                    <Button
                                        color="error"
                                        onClick={() => deleteProduct(p._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <Button
                        variant="outlined"
                        onClick={() => {
                            setSelectedProduct(product);
                            setOpen(true);
                        }}
                    >
                        Edit
                    </Button>
                    <EditProductModal
                        open={open}
                        handleClose={() => setOpen(false)}
                        product={selectedProduct}
                        refresh={fetchProducts}
                    />

                </Table>
            </Paper>
        </Layout>
    );
};

export default Products;
