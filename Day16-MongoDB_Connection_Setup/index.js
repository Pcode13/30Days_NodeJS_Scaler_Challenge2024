const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.get('/', (req, res) => {
    res.send("Welcome to connecting MongoDB with Express");
})

/**
 * Establishes a connection to MongoDB using Mongoose
 */
async function connectToMongoDB() {
    // Your implementation here
    try {
        mongoose.connection
            .on('error', (error) => {
                console.log("Error: " + error);
            })
            .once('open', (error) => {
                if (error) {
                    console.log(error);
                }
                console.log("Connection is established and OPEN!");
            })
            .on('connecting', () => {
                console.log("Mongo DB Connecting! Please Wait...");
            })
            .on('connected', () => {
                console.log("Mongo DB Connected!");
            })
            .on('disconnected', () => {
                console.log("Mongo DB Disconnected!");
            })

        await mongoose.connect('mongodb://127.0.0.1:27017/scalerDatabase');
    } catch (error) {
        console.log(error);
    }
}

const port = 3000;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Listening at http://127.0.0.1:${port}`);
        connectToMongoDB();
    }
})