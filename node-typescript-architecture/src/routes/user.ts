import express, { Request, Response } from 'express';

const userRoutes = express.Router();

userRoutes.get('/users', (_req: Request, res: Response) => {
  res.send('Users');
});

export default userRoutes;
