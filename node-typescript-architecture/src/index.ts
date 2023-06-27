import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { User } from './modules/entities/user';
import userRoutes from './routes/user';

const app = express();
const port = 3000;

app.use(express.json());

// Middleware to establish MongoDB connection
app.use(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // if (mongoose.connection.readyState === 0) {
    //   await mongoose.connect('mongodb+srv://admin:ShRAexePjIwDVTvp@cluster0.0ozojp9.mongodb.net/house-gate');
    // }

    const dataSource = new DataSource({
      type: 'mongodb',
      url: 'mongodb+srv://admin:ShRAexePjIwDVTvp@cluster0.0ozojp9.mongodb.net/house-gate?retryWrites=true&w=majority',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: ['src/modules/entities/*.ts'],
    });

    await dataSource
      .initialize()
      .then(() => console.log('Db connect successfully'))
      .catch((err) => console.log(err));

    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';

    const manager = dataSource.manager;
    await manager.save(user);

    next();
  } catch (error) {
    console.error('Failed to connect to MongoDB: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.use('/api/v1', userRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello NodeJs');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
