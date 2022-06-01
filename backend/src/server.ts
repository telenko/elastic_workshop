import express from 'express';
import router from './routes';

const app = express();
app.use(express.json());
app.use('/api', router);

app.listen(8080, () => console.log('Server is running on port 8080'));