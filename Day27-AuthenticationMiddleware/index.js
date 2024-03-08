const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const PORT = 3000;

const SECRET_KEY = 'yourSecretKey';

function authenticateAndAuthorize(requiredRole) {

    return (req, res, next) => {

        const token = req.headers.authorization;

        if (!token){

            return res.status(401).send('Unauthorized');
    } 
    try {

        const decoded = jwt.verify(token, SECRET_KEY);

        if (decoded.role !== requiredRole) {
            return res.status(403).send('Forbidden');

        }
        next();

    } catch (error) {

        return res.status(401).json({ error: "Unauthorized Invalid token" });
    }
};}


//Example route that requires admin authentication

app.get('/admin-only', authenticateAndAuthorize('admin'), (res) => {

    res.json({ message: 'Admin route accessed successfully' });


});

//Example route that requires regular user authentication

app.get('/user-only', authenticateAndAuthorize('user'), (req, res) => {
    res.json({ message: 'User route accessed successfully' });

});

app.listen(PORT, () => {


    console.log("Server running on port ${PORT}");
});