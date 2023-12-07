// Importing the express framework and the v4 function from the uuid library
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

// Generating a new UUID 
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

// Creating an instance of the Express router
const router = express.Router();

// Creating database
const books = [];

// Handling GET requests to the root endpoint ('/')
router.get('/', (req, res) => {
    // Logging the current state of the books array
    console.log(books);
    // Sending the books array as a JSON response
    res.json(books);
});

// Handling POST requests to the root endpoint ('/')
router.post('/', (req, res) => {
    // Extracting user data from the request body
    const user = req.body;
    // Adding a new user to the books array with a generated UUID
    books.push({ ...user, id: uuidv4() });
    // Sending a response indicating the successful addition of the user
    res.send(`user with the name ${user.title} added to the database!`);
});

// Handling GET requests to a specific user ID endpoint ('/:id')
router.get('/:id', (req, res) => {
    // Extracting the user ID from the request parameters
    const { id } = req.params;
    // Finding a user with the specified ID in the books array
    const foundUser = books.find((user) => user.id === id);
    // Sending the found user as a response
    res.send(foundUser);
});


// Handling PUT requests to a specific user ID endpoint ('/:id')
router.put('/:id', (req, res) => {
    // Extracting the user ID from the request parameters
    const { id } = req.params;
    // Extracting user data (title, author, year) from the request body
    const { title, author, year } = req.body;
    // Finding a user with the specified ID in the books array
    const user = books.find((user) => user.id === id);

    // Check if the user with the specified ID exists
    if (!user) {
        return res.status(404).send(`User with ID ${id} not found`);
    }

    // Updating user properties with the provided data from the request body
    user.title = title || user.title;
    user.author = author || user.author;
    user.year = year || user.year;

    // Sending a response indicating the successful update of the user
    res.send(`User with ID ${id} has been updated`);
});



// Handling PATCH requests to a specific user ID endpoint ('/:id')  --> its optional code if someone just want to update specific things
router.patch('/:id', (req, res) => {
    // Extracting the user ID from the request parameters
    const { id } = req.params;
    // Extracting user data (title, author, year) from the request body
    const { title, author, year } = req.body;
    // Finding a user with the specified ID in the books array
    const user = books.find((user) => user.id === id);
    // Updating user properties if provided in the request body
    if (title) {
        user.title = title;
    }
    if (author) {
        user.author = author;
    }
    if (year) {
        user.year = year;
    }
    // Sending a response indicating the successful update of the user
    res.send(`user with the id $ ${id} has been updated`);
});


// Exporting the router for use in other parts of the application
export default router;
