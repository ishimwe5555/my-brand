const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const request= require('supertest');
const app = require('../backend/server');


chai.use(chaiHttp);
const expect = chai.expect;

describe('Your API', () => {
  it('Should return a 200 status code for GET / endpoint', () => {
      return request(app)
      .get('/')
      .expect(200)
      .then(res =>{
        assert.ok(res.to.have.status(200))
      })
    
  });
});