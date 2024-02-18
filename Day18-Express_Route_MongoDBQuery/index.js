const express = require('express');
const app = express();

const { connectToMongoDB } = require('./utils/connectToMongoDB')
const { User } = require('./models/user.model');

app.get('/users', (req, res) => {
    getAllUsers(req, res);
})

/**
 * Express route to get all users from MongoDB
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllUsers(req, res) {
    // Your implementation here
    try {
        const isConnectedToDatabase = await connectToMongoDB();
        if (isConnectedToDatabase) {
            const users = await User.find({}).select("name email -_id");
            return res.status(200).json(users);
        } else {
            return res.status(404).send("Could not connect to the Database to fetch Users!");
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send("Error encountered while trying to fetch Users!");
    }
}

const port = 3000;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Listening at http://127.0.0.1:${port}`);
    }
})