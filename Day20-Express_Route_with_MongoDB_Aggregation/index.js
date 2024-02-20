const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const PORT = 3000;

// MongoDB Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'your_database_name';

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error occurred while connecting to MongoDB', err);
    return;
  }

  console.log('Connected successfully to MongoDB');

  const db = client.db(dbName);
  const usersCollection = db.collection('users');

  // Express route to calculate the average age of all users
  app.get('/average-age', async (req, res) => {
    try {
      const pipeline = [
        {
          $group: {
            _id: null,
            averageAge: { $avg: '$age' }
          }
        }
      ];

      const result = await usersCollection.aggregate(pipeline).toArray();

      if (result.length === 0) {
        // If there are no users in the database
        return res.status(404).json({ error: 'No users found' });
      }

      const averageAge = result[0].averageAge;

      res.json({ averageAge });
    } catch (error) {
      console.error('Error occurred while calculating average age', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
