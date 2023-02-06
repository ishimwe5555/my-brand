const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const request= require('supertest');
const app = require('../backend/server');


chai.use(chaiHttp);
const expect = chai.expect;

describe('Your API', () => {
  it('Should return a 200 status code for GET / endpoint', async () => {
      const response = await chai.request(app).get('/posts')
      expect(response).to.have.status(200)
      
  });
});
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});