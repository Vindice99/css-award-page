const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./Schema/event'); // Adjust the path as needed

dotenv.config(); // Load environment variables

const app = express();

// Middleware to parse request bodies and serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Setting up the MongoDB connection with options
const dbURL = process.env.DB_URL;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Route to render the form page for creating a new event
app.get('/create-event', (req, res) => {
  res.render('form');
});

// Route to handle form submission and save event data to MongoDB
app.post('/submit-event', (req, res) => {
  const event = new Event({
    title: req.body.title,
    date: req.body.date,
    publisher: req.body.publisher,
    price: req.body.price,
    origin: req.body.origin,
    description: req.body.description,
  });

  event.save()
    .then(() => {
      console.log('Event saved to MongoDB');
      res.redirect('/events'); // Redirect to the events page
    })
    .catch(err => {
      console.error('Error saving event:', err);
      res.status(500).send('Failed to save event');
    });
});

// Route to display all events
app.get('/events', (req, res) => {
  Event.find()
    .then(events => {
      res.render('index', { title: 'All Events', events: events });
    })
    .catch(err => {
      console.error('Error fetching events:', err);
      res.status(500).send('Failed to fetch events');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
