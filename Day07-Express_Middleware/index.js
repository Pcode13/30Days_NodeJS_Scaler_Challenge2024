const express = require('express');
const app = express();

function requestLoggerMiddleware(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  // Call next middleware in the chain
  next();
}

app.use(requestLoggerMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});