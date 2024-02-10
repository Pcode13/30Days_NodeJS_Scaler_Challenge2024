const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
function positiveIntegerHandler(req, res) {
    const number = parseInt(req.query.number);
    if (!isNaN(number) && number > 0) {
        res.send('Success! Number is a positive integer.');
      } else {
        throw new Error('Number must be a positive integer.');
      }
  }

  function errorHandler(err, req, res, next) {
    if (err.message === 'Number must be a positive integer.') {
      res.status(400).send('Error: Number must be a positive integer.');
    } else {
      next(err); // Forward the error to the default error handler
    }
  }

  app.use(errorHandler);

  app.get('/positive', positiveIntegerHandler);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });