const express = require('express');
const path = require('path');

function staticFileServer(req, res) {
    const filePath = req.url === '/' ? '/index.html' : req.url;
    const fullPath = path.join(__dirname, 'public', filePath);
    
    res.sendFile(fullPath, (err) => {
      if (err) {
        console.error(err);
        res.status(err.status || 500).send('Internal Server Error');
      }
    });
  }
  
  const app = express();
  

  app.use(staticFileServer);
  

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });