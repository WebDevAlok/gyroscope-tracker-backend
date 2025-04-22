const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import path module

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const gyroscopeData = []; // Store the latest 10 data frames

app.post('/gyroscope', (req, res) => {
  console.log('Gyroscope data received:', req.body);

  // Add new data and maintain only the latest 10 frames
  gyroscopeData.push(req.body);
  if (gyroscopeData.length > 10) {
    gyroscopeData.shift();
  }

  res.sendStatus(200);
});

app.get('/dashboard', (req, res) => {
  // Serve the dashboard.html file
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/data', (req, res) => {
  // Serve raw gyroscope data as JSON
  res.json(gyroscopeData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});