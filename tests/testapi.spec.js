import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

import {
  fakeMessages,
  fakeMessages2,
  fakeUsers,
  fakeLogin,
  fakeMessages3,
  fakeUsers2,
  fakeLogin2
} from './testData';
const should = chai.should();
chai.use(chaiHttp);

describe('/GET message', () => {
  it('should get all the message', done => {
    chai
      .request(server)
      .get('/api/V1/messages')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');

        done();
      });
  });
});

describe('/GET unread message', () => {
  it('should get all unread message', done => {
    chai
      .request(server)
      .get('/api/V1/messages/unread')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');

        done();
      });
  });
});

describe('/GET sent message', () => {
  it('should get all sent message', done => {
    chai
      .request(server)
      .get('/api/V1/messages/sent')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');

        done();
      });
  });
});

describe('POST message', () => {
  it(' it should return a valid object', done => {
    chai
      .request(server)
      .post('/api/V1/messages')
      .send(fakeMessages2)
      .end((err, res) => {
        res.should.be.a('object');
        res.body.data.should.have.property('subject');
        res.body.data.subject.should.be.a(
          'string',
          'Expected the subject to be a string'
        );
        res.body.data.should.have.property('message');
        res.body.data.message.should.be.a(
          'string',
          'Expected the message to be a string'
        );
        res.body.data.should.have.property('parentMessageId');
        res.body.data.parentMessageId.should.be.a(
          'number',
          'Expected parentMessageId to be a number'
        );

        res.body.data.should.have.property('status');
        res.body.data.status.should.be.a(
          'string',
          'Expected the status to be a string'
        );
        done();
      });
  });
});

describe('POST an invalid message', () => {
  it(' it should return an error', done => {
    chai
      .request(server)
      .post('/api/V1/messages')

      .send(fakeMessages3)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(400);
        done();
      });
  });
});

describe('GET messages/: id message', () => {
  it('should display message with a specific id', done => {
    chai
      .request(server)
      .get('/api/V1/messages/' + fakeMessages.id)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });
  it('should not display a message with an invalid message id ', done => {
    chai
      .request(server)
      .get('/api/v1/messages/invalid')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property(
          'message',
          'the message with a given id does not exist'
        );
        done();
      });
  });
});

describe('delete messages/: id message', () => {
  it('should display message with a specific id', done => {
    chai
      .request(server)
      .delete('/api/V1/messages/' + fakeMessages.id)
      .end((err, res) => {
        res.body.should.have.property('message', 'message deleted');
        done();
      });
  });
});
describe('POST a user', () => {
  it(' it should return a valid object', done => {
    chai
      .request(server)
      .post('/api/V1/auth/signup')
      .send(fakeUsers)
      .end((err, res) => {
        res.should.be.a('object');
        res.should.have.status(201);
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
