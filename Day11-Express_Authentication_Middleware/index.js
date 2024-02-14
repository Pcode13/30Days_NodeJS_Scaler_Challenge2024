const express = require('express');
const app = express();
const authenticateToken = require('./authenticateToken');

// Use the authentication middleware for protected routes
app.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
