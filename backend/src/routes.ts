import express from 'express';

const router = express.Router();

router.get('/products', (req, res) => {
    res.status(200).send([
        {
            name: "test", model: "m22", description: "some description", id: "1"
        },
        {
            name: "test2", model: "m232", description: "some description", id: "2"
        },
        {
            name: "test3", model: "m233", description: "some description", id: "3"
        }
    ])
})

let orders: any[] = [];

const booking = (request: { items: any[], city?: string }) => new Promise((r, rj) => setTimeout(() => {
    if (request.items.length > 2) {
        rj('only 2 types can be booked');
    }
    orders.push({ id: `id:${Math.random().toString(16).slice(2)}`, items: request.items, city: request.city });
    r('ok')
}, 1000))
const payment = (request: any) => new Promise(r => setTimeout(r, 1000))

router.post('/orders', async (req, res) => {
    try {
        await booking(req.body);
        await payment(req.body);
        res.status(201).send("ok");
    } catch (e) {
        res.status(500).send(e);
    } finally {
    }

})

router.get('/orders', (req, res) => {
    res.status(201).send(orders);
})

export default router;