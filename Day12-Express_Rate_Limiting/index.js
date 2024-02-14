const express = require('express');
const app = express();

function rateLimit(req, res, next) {
    const rateLimit = 10; 
    const ip = req.ip;


    if (!app.rateLimits[ip]) {
        app.rateLimits[ip] = {
            count: 1,
            timestamp: Date.now()
        };
        next();
    } else {

        const now = Date.now();
        const elapsedTime = now - app.rateLimits[ip].timestamp;

        if (elapsedTime < 1000) {
            app.rateLimits[ip].count++;
        } else {
            app.rateLimits[ip].count = 1;
            app.rateLimits[ip].timestamp = now;
        }

        if (app.rateLimits[ip].count > rateLimit) {
            res.status(429).send('Too Many Requests');
        } else {
            next();
        }
    }
}
app.rateLimits = {};
app.use(rateLimit);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});