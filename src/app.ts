import express from 'express';
import { convertBitcoinPrice } from './service';
import cors, { CorsOptions } from 'cors';

const app = express();

// Define CORS options
const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000'], // Allowed origins
  methods: ['GET', 'POST'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', '*'], // Allowed headers
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Welcome to the Library API');
});

app.post('/convert-btc/:value', async (req, res) => {
    await convertBitcoinPrice(req, res);
});

export default app;