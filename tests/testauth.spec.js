import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { fakeUsers, fakeLogin, fakeUsers2, fakeLogin2 } from './testData';

const should = chai.should();
chai.use(chaiHttp);
describe('POST a user', () => {
  it(' it should return a valid object', done => {
    chai
      .request(server)
      .post('/api/V1/auth/signup')
      .send(fakeUsers)
      .end((err, res) => {
        res.should.be.a('object');
        res.should.have.status(201);``
        res.body.should.have.property('data');

        done();
      });
  });
});

describe('POST an invalid user', () => {
  it(' it should return an error', done => {
    chai
      .request(server)
      .post('/api/V1/auth/signup')

      .send(fakeUsers2)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('POST a login', () => {
  it(' it should return a valid object', done => {
    chai
      .request(server)
      .post('/api/V1/auth/login')
      .send(fakeLogin)
      .end((err, res) => {
        res.should.be.a('object');
        res.should.have.status(200);
        res.body.should.have.property('data');

        done();
      });
  });
});

describe('POST an invalid login', () => {
  it(' it should return an error', done => {
    chai
      .request(server)
      .post('/api/V1/auth/login')

      .send(fakeLogin2)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
