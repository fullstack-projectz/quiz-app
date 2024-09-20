/**
 * Here the file to create
 * a new server in express
 *
 * @author meganathan
 */

import express from 'express';

const app = express();

// define the port
const PORT = process.env.PORT || 8080;

// INITIAL url to get the api
app.use('/api/v1/users', () => {});

// run the server
app.listen(PORT, () => {
  console.log(`Server is starting port on ${PORT}`);
});
