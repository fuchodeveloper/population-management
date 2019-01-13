import db from '../models';
const { Resident, Location } = db;

const createLocation = (request, response) => {
  const { name, malePopulation, femalePopulation } = request.body;

  return Location.create({
    name,
    malePopulation,
    femalePopulation,
  })
    .then(location => {
      response.status(201).json({
        location,
        message: 'Location created successfully!',
      })
    })
    .catch(() => {
      response.status(500).json({
        error: 'Unexpected error. Location not created!',
      });
    });
};

const getLocations = (request, response) => {
  return Location.findAll()
    .then(location => {

      const locationSummary = location.map(loc => {
        const { name, malePopulation, femalePopulation } = loc.dataValues;
        const totalPopulation = malePopulation + femalePopulation;

        return {
          name,
          malePopulation,
          femalePopulation,
          totalPopulation,
        };
      });
      
      response.status(200).json({
        locationSummary,
      });
    })
    .catch(() => {
      return response.status(500).json({
        error: 'Unexpected error. Location not returned!',
      });
    });
};

const updateLocation = (request, response) => {
  const { body, params: { locationId } } = request;
  const { name, malePopulation, femalePopulation } = body;

  return Location.findOne({
    where: { id: locationId }
  })
    .then(location => {
      if (!location) {
      return response.status(404)
        .json({ error: 'Location not found' });
    }

    location
      .update({
        name,
        malePopulation,
        femalePopulation,
      });
    
      return response.status(200)
        .json({
          location,
          message: 'Location updated successfully',
        })
  })
    .catch(() => {
      return response.status(500).json({
        error: 'Unexpected error. Location not updated!',
      });
    });
};

const deleteLocation = (request, response) => {
  const { params: { locationId } } = request;

  return Location.findOne({ 
    where: { 
      id: locationId
    },
  })
  .then(location => {
    if (!location) {
      return response.status(404)
        .json({ error: 'Location not found.' });
    }
    return location
      .destroy()
      .then(() => {
        return response
          .status(200)
          .json({ message: 'Location and associated residents deleted from database!' })
      })
  })
    .catch(() => {
      return response.status(500).json({
        error: 'Unexpected error. Location not deleted!',
      });
    });
};

export {
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation
};
