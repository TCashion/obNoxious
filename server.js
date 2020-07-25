require('dotenv').config();

const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const authorizations = require('./config/middleware/authorizations');
const mapboxesRoutes = require('./routes/api/mapboxes');
const featuresRoutes = require('./routes/api/features');
const notesRoutes = require('./routes/api/notes');
const plantsRoutes = require('./routes/api/plants');
const reportsRoutes = require('./routes/api/reports');
const usersRoutes = require('./routes/api/users');

const app = express();

require('./config/database');

// Mount middleware
app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'build')));

// API routes
// authorization middleware
app.use(authorizations.extractUserFromToken);
app.use('/api/users', usersRoutes);
app.use('/api/plants', plantsRoutes);
app.use('/api/reports/features', featuresRoutes);
app.use('/api/reports/notes', notesRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/mapbox', mapboxesRoutes);

// Catch all for bad routes 
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Express app running on port ${port}`)
});