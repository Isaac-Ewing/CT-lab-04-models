import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import bogController from './controllers/bogs.js';
import cogController from './controllers/cogs.js';
import logController from './controllers/logs.js';

const app = express();

app.use(express.json());

app.use('/api/v1/bogs', bogController);
app.use('/api/v1/cogs', cogController);
app.use('/api/v1/logs', logController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
