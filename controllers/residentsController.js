import db from '../models';
const { Resident } = db;

const createResident = (request, response) => {
  const { locationId, name, gender } = request.body;

  return Resident.create({
    locationId,
    name,
    gender,
  })
    .then(resident => {
      response.status(201).json({
        resident,
        message: 'Resident created successfully!',
      })
    })
    .catch(() => {
      response.status(500).json({
        error: 'Unexpected error. Resident not created!',
      });
    });
}

export { createResident };
