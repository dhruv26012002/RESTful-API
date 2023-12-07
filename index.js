// Importing the express framework and the bodyParser middleware
import express from 'express';
import bodyParser from 'body-parser';

// Importing the usersRoutes from the './routes/users.js' file
import usersRoutes from './routes/books.js';

// Creating an instance of the express application
const app = express();

// Specifying the port number for the server to listen on
const PORT = 5000;

// Adding the bodyParser middleware to parse incoming JSON data
app.use(bodyParser.json());

// Using the 'usersRoutes' for handling routes starting with '/users'
app.use('/books', usersRoutes);

// Handling GET requests to the root endpoint ('/')
app.get('/', (req, res) => {
    // Sending a simple response to the homepage
    res.send('hello from homepage');
});

// Starting the server and listening on the specified port
app.listen(PORT, () => console.log(`server Running on port: http://localhost:${PORT}`));
