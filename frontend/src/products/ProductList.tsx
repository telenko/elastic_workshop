import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { getCity } from "../utils/getCity";
import './products.css';

type ProductEntity = {
    name: string;
    model: string;
    description: string;
    id: string;
    amount?: number;
}

const Product: React.FC<{ value: ProductEntity, onAdd: () => void, onRemove: () => void }> = ({ value, onAdd, onRemove }) =>
(<Card className="product">
    <CardMedia
        component="img"
        height="194"
        image="/laptop.png"
        alt="Paella dish"
        width="500"
    />
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Product added {value.amount ?? 0}
        </Typography>
        <Typography variant="h5" component="div">
            {value.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {value.model}
        </Typography>
        <Typography variant="body2">
            {value.description}
        </Typography>
    </CardContent>
    <CardActions>
        <Button size="small" onClick={onAdd}>Add</Button>
        <Button size="small" onClick={onRemove}>Remove</Button>
    </CardActions>
</Card>)

const ProductList: React.FC = () => {
    const [items, setItems] = useState<ProductEntity[]>([]);
    useEffect(() => {
        (async () => {
            const { data: newItems } = await axios.get("/api/products");
            setItems(newItems);
        })();
    }, []);
    const submitHandler = useCallback(async () => {
        let city = '';
        try {
            city = await getCity();
        } catch { }
        try {
            await axios.post('/api/orders', {
                items: items.filter(it => (it.amount ?? 0) > 0).map(it => ({ id: it.id, amount: it.amount })), city
            });
            alert('Order created!')
        } catch(e: any) {
            alert('Failed to create order!')
        }
    }, [items]);
    return (<div className='products'>
        <h2>Products</h2>
        <div style={{ display: 'flex' }}>
            {items.map(product => <Product key={product.id} value={product} onAdd={() => {
                setItems(items => items.map(item => item.id === product.id ? ({ ...item, amount: (item.amount ?? 0) + 1 }) : item))
            }} onRemove={() => {
                setItems(items => items.map(item => item.id === product.id ? ({ ...item, amount: 0 }) : item))
            }} />)}
        </div>
        <Button
            size="large" variant="contained" className="order-btn"
            onClick={submitHandler} disabled={items.filter(it => (it.amount ?? 0) > 0).length === 0}>Order</Button>
    </div>)
}

export default ProductList;