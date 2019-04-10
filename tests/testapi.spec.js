import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { fakeMessages, fakeMessages2, fakeMessages3 } from './testData';

const should = chai.should();
chai.use(chaiHttp);

describe('/GET message', () => {
  it('should  not get all the message to unauthenticated user ', done => {
    chai
      .request(server)
      .get('/api/V2/messages')
      .end((err, res) => {
        res.should.have.status(401);

        done();
      });
  });
});

describe('/GET unread message', () => {
  it('should  not display  all unread message to unathaurized user', done => {
    chai
      .request(server)
      .get('/api/V2/messages/unread')
      .end((err, res) => {
        res.should.have.status(401);
        // res.body.should.be.a('array');

        done();
      });
  });
});

describe('/GET sent message', () => {
  it('should not dispaly all sent message to unauthorized user', done => {
    chai
      .request(server)
      .get('/api/V2/messages/sent')
      .end((err, res) => {
        res.should.have.status(401);
        

        done();
      });
  });
});

describe('POST message', () => {
  it(' it should return a valid object', done => {
    chai
      .request(server)
      .post('/api/V2/messages')
      .send(fakeMessages2)
      .end((err, res) => {
        console.log(res.body);
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

describe('POST anauthorized user post message', () => {
  it(' it should return an error', done => {
    chai
      .request(server)
      .post('/api/V2/messages')

      .send(fakeMessages3)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(401);
        res.body.should.have.property('error', 'unauthorized access');
        done();
      });
  });
});

describe('GET messages/: id message', () => {
  //   it('should display message with a specific id', done => {
  //     chai
  //       .request(server)
  //       .get('/api/V2/messages/' + fakeMessages.id)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.should.be.a('object');
  //         done();
  //       });
  //   });
  it('should not display a message to unauthorized user', done => {
    chai
      .request(server)
      .get('/api/v2/messages/id message')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error', 'unauthorized access');
        done();
      });
  });
});

describe('delete messages/: id message', () => {
  it('should display message with a specific id', done => {
    chai
      .request(server)
      .delete('/api/V2/messages/' + fakeMessages.id)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error', 'unauthorized access');
        done();
      });
  });
});
