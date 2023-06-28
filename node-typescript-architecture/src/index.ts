import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import * as entities from '@src/modules/entities';
import userRoutes from '@src/routes/user';
import { User } from '@src/modules/entities';

const app = express();
const port = 3000;

app.use(express.json());

// Middleware to establish MongoDB connection
const connectDatabase = async () => {
  try {
    // if (mongoose.connection.readyState === 0) {
    //   await mongoose.connect('mongodb+srv://admin:ShRAexePjIwDVTvp@cluster0.0ozojp9.mongodb.net/house-gate');
    // }

    const dataSource = new DataSource({
      type: 'mongodb',
      url: 'mongodb+srv://admin:ShRAexePjIwDVTvp@cluster0.0ozojp9.mongodb.net/house-gate?retryWrites=true&w=majority',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [...Object.values(entities)],
    });

    console.log('Db is connecting...');

    await dataSource
      .initialize()
      .then(() => console.log('Db connect successfully'))
      .catch((err) => console.log(err));

    // Sample to add new user
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';

    const manager = dataSource.manager;
    await manager.save(user);
  } catch (error) {
    console.error('Failed to connect to MongoDB: ', error);
  }
};

app.use('/api/v1', userRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello NodeJs');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);

  // Connect to the database after the server has started
  connectDatabase();
});
