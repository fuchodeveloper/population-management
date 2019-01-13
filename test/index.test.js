import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';
import db from '../models';

chai.use(chaiHttp);

const { Location, Resident } = db;

const doBeforeAll = () => {
  before((done) => {
    Location.destroy({
      force: true,
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    Resident.destroy({
      force: true,
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    done();
  });
};

const doBeforeEach = () => {
  beforeEach((done) => {
    db.sequelize.sync();
    done();
  });
};

const doAfterAll = () => {
  after(() => chai.request(app).close());
}

describe('Locations Controller', () => {
  doBeforeAll();
  doBeforeEach();

  it('should create a location', (done) => {
    const locationInput = {
      name: 'Abuja',
      malePopulation: 500,
      femalePopulation: 540,
      districts: 'Utako, Gwari',
    }
    chai.request(app)
      .post('/api/v1/locations/create')
      .set('Content-Type', 'application/json')
      .send(locationInput)
      .end((error, response) => {
        expect(response.body.message).to.equal('Location created successfully!');
        expect(response.body.location.name).to.have.equal('Abuja');
        expect(response.body.location.malePopulation).to.have.equal(500);
        expect(response.body.location.femalePopulation).to.have.equal(540);
        expect(response).to.have.status(201);
        done();
      });
  });

  it('should create a resident', (done) => {
    const residentInput = {
      locationId: 1,
      name: 'John Doe',
      gender: 'male',
    }
    chai.request(app)
      .post('/api/v1/residents/create')
      .set('Content-Type', 'application/json')
      .send(residentInput)
      .end((error, response) => {
        expect(response.body.message).to.equal('Resident created successfully!');
        expect(response.body.resident.name).to.equal('John Doe');
        expect(response).to.have.status(201);
        done();
      });
  });

  it('should get all locations', (done) => {
    const allLocations = 
      [{
        name: 'Abuja',
        malePopulation: 500,
        femalePopulation: 540,
        totalPopulation: 1040,
        districts: 'Utako, Gwari'
      }]
    ;
    chai.request(app)
      .get('/api/v1/locations/getAll')
      .set('Content-Type', 'application/json')
      .end((error, response) => {
        expect(response.body.locationSummary).to.be.an.instanceof(Array);
        expect(response.body.locationSummary).to.deep.equal(allLocations);
        expect(response).to.have.status(200);
        done();
      });
  });

  it('should update a location', (done) => {
    const newLocationInput = {
      name: 'Abuja (FCT)',
      malePopulation: 600,
      femalePopulation: 740,
      districts: 'Utako, Gwari, Wuye, Wuse',
    };
    chai.request(app)
      .put('/api/v1/locations/update/1')
      .set('Content-Type', 'application/json')
      .send(newLocationInput)
      .end((error, response) => {
        expect(response.body.location.name).to.equal('Abuja (FCT)');
        expect(response.body.message).equal('Location updated successfully');
        expect(response).to.have.status(200);
        done();
      });
  });

  it('should not update invalid location', (done) => {
    const newLocationInput = {
      name: 'Abuja (FCT)',
      malePopulation: 600,
      femalePopulation: 740,
      districts: 'Utako, Gwari, Wuye, Wuse',
    };
    chai.request(app)
      .put('/api/v1/locations/update/1111111111')
      .set('Content-Type', 'application/json')
      .send(newLocationInput)
      .end((error, response) => {
        expect(response.body.error).equal('Location not found');
        expect(response).to.have.status(404);
        done();
      });
  });

  it('should not delete a location that does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/locations/delete/9999')
      .set('Content-Type', 'application/json')
      .end((error, response) => {
        expect(response.body.error).equal('Location not found.');
        expect(response).to.have.status(404);
        done();
      });
  });

  it('should trigger a 500 error when delete fails', (done) => {
    chai.request(app)
      .delete('/api/v1/locations/delete/999999999999999999999')
      .set('Content-Type', 'application/json')
      .end((error, response) => {
        expect(response.body.error).equal('Unexpected error. Location not deleted!');
        expect(response).to.have.status(500);
        done();
      });
  });

  it('should delete a location', (done) => {
    chai.request(app)
      .delete('/api/v1/locations/delete/1')
      .set('Content-Type', 'application/json')
      .end((error, response) => {
        expect(response.body.message).equal('Location and associated residents deleted from database!');
        expect(response).to.have.status(200);
        done();
      });
  });
});
