/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
import request from 'supertest';
import {
  should,
  expect,
  chai,
  assert,
} from 'chai';

import server from '../server/app';

import Store from '../server/models/storage';

should();

describe('Create Meetup API', () => {
  const data = {
    topic: 'helping hands',
    location: 'ikorodu',
    date: '1465599344356',
    tags: 'goal yeah',
  };

  it('Should create a meetup', (done) => {
    request(server)
      .post('/api/v1/meetups')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.property('meetupId');
        expect(res.body.data[0].meetupId).to.equal(1);
        expect(res.body.data[0]).to.have.property('topic');
        expect(res.body.data[0].topic).to.equal('helping hands');
        expect(res.body.data[0]).to.have.property('location');
        expect(res.body.data[0].location).to.equal('ikorodu');
        expect(res.body.data[0]).to.have.property('date');
        expect(res.body.data[0].date).to.equal('2016-06-10T22:55:44.356Z');
        expect(res.body.data[0]).to.have.property('tags');
        expect(res.body.data[0].tags).to.be.an('array');
        expect(res.body.status).to.be.a('number');
        expect(res.body.status).to.equal(201);
        Store.clearAll();
        done();
      });
  });
});

describe('It disaplays an error if a meetup does not exist', () => {
  it('Should return a 404 response if meetup does not exist', (done) => {
    request(server)
      .get('/api/v1/meetups/900')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('It displays error if meetup is empty', () => {
  it('Should return a 204 response if meetup is empty', (done) => {
    request(server)
      .get('/api/v1/meetups')
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET Meetups API', () => {
  before(() => {
    const data = {
      topic: 'helping hands from datastructure test',
      location: 'ikorodu',
      date: '1465599344356',
      tags: 'goal yeah',
    };
    const data1 = {
      topic: 'helping hands from datastructure test1',
      location: '1 ikorodu',
      date: '1465599344356',
      tags: 'goal yeah',
    };
    Store.create(data);
    Store.create(data1);
  });

  after(() => {
    Store.clearAll();
  });

  it('Should return a 201 response if meetup is populated', (done) => {
    const meetups = Store.findAll();
    request(server)
      .get('/api/v1/meetups')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        meetups.should.be.an('array');
        (meetups[0]).should.be.an('object');
        (meetups[1]).should.be.an('object');
        (meetups[0].meetupId).should.equal(1);
        (meetups[1].meetupId).should.equal(2);
        (res.body.status).should.equal(200);
        (res.body.data).should.be.an('array');
        done();
      });
  });
});

describe('GET upcoming', () => {
  before(() => {
    const data = {
      topic: 'helping hands from datastructure test',
      location: 'ikorodu',
      date: '1465599344356',
      tags: 'goal yeah',
    };
    const data1 = {
      topic: 'helping hands from datastructure test1',
      location: '1 ikorodu',
      date: '1465599344356',
      tags: 'goal yeah',
    };
    Store.create(data);
    Store.create(data1);
  });
  it('Should get only meetups that have not happened', (done) => {
    const meetups = Store.findUpcoming();
    request(server)
      .get('/api/v1/meetups/upcoming/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        (meetups[0].upcoming).should.be.true;
        (meetups[1].upcoming).should.be.true;
        done();
      });
  });
});

describe('POST questions', () => {
  before(() => {
    const data = {
      topic: 'helping hands from datastructure test',
      location: 'ikorodu',
      date: '1465599344356',
      tags: 'goal yeah',
    };
    Store.create(data);
    const meetup = {
      user: 1,
      meetup: 1,
      title: 'yolo',
      body: 'qestions ghghdn???',
    };
    Store.question(1, meetup);
  });
  it('Should post questions', (done) => {
    request(server)
      .get('/api/v1/meetups/upcoming/')
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});