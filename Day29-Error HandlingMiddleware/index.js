// // Import required modules
// import express from 'express';
// const app = express();
// // Define the error handling middleware function
// const errorHandler (err, req, res, next) => {
// };
// console.error(err); // Log the error for debugging purposes
// res.status(500).json({ error: 'Internal Server Error' }); // Send 500 status and an error response to the client
// // Register the error handling middleware
// app.use(errorHandler);
// // Define your routes
// app.get('/', (req, res) => {
// // Your route logic here
// throw new Error('Something went wrong'); // Simulate an error for demonstration
// });
// // Start the server
// app.listen(3000, () => {
// });
// console.log('Server is running on port 3000');

const express = require('express');
function errorHandler(err, req, res, next) {
console.error(err);
if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
}
res.status(500).json({ error: 'Internal Server Error' });

}
class CustomError extends Error {
constructor(message, statusCode) {
super (message);
this.statusCode = statusCode;
}
}
const app = express();
app.get('/', (req, res, next) => {
try {
throw new CustomError('Custom Error Message', 400);
} catch (err) {
next(err);
}
});


app.listen(3000, () => {
console.log('Server is running on port 3000');
});