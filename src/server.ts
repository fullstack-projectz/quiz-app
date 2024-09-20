/**
 * Here the file to create
 * a new server in express
 *
 * @author meganathan
 */

import express from 'express';
import userRoutes from './routes/UserRoutes';
import { connectDB } from './config/Database';

// When server starts the db will connect
connectDB();

const app = express();

// middleware to parse the json bodies in req
app.use(express.json());

// define the port
const PORT = process.env.PORT || 8080;

// INITIAL url to get the api
app.use('/api/v1/users', userRoutes);

// run the server
app.listen(PORT, () => {
  console.log(`Server is starting port on ${PORT}`);
});
