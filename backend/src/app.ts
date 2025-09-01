import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { mainRouter } from '@/api/routes';
import { errorHandler } from '@/api/middleware/error.middleware';
import { notFoundHandler } from '@/api/middleware/notFound.middleware';

const app: Application = express();

// Middlewares de segurança e utilitários
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint de Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP' });
});

// Rotas da API
app.use('/api/v1', mainRouter);

// Middlewares de tratamento de erros
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
