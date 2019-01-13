import express from 'express';
import bodyParser from 'body-parser';
import { createResident } from '../controllers/residentsController';
import { 
  createLocation, 
  getLocations, 
  updateLocation,
  deleteLocation,
} from '../controllers/locationsController';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = parseInt(process.env.PORT, 10) || 8080;

// Create a resident
app.post('/api/v1/residents/create', createResident);

// Create a location
app.post('/api/v1/locations/create', createLocation);

// Get all available locations and their population summaries
app.get('/api/v1/locations/getAll', getLocations);

// Update data for a specific location
app.put('/api/v1/locations/update/:locationId', updateLocation);

// Delete a specified location
app.delete('/api/v1/locations/delete/:locationId', deleteLocation);

// Catch all invalid routes
app.all('*', (request, response) => response.status(404).send({
  message: 'Oops! 404. Page not Found',
}));

app.listen(port);

export default app;
