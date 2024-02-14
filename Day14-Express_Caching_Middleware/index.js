const express = require('express');
const cache = require('memory-cache');

const app = express();


const cacheMiddleware = (req, res, next) => {
  const key = '__express__' + req.originalUrl || req.url;
  const cachedResponse = cache.get(key);
  
  if (cachedResponse) {
    res.send(cachedResponse);
    return;
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      cache.put(key, body, CACHE_EXPIRATION_TIME); 
      res.sendResponse(body);
    };
    next();
  }
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
