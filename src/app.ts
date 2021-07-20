import express from 'express';
import './utils/formatCurrency';

import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

export default app;
