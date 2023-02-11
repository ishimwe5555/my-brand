const { hash } = require('bcrypt');
const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const request= require('supertest');
const connectDB = require('../backend/config/db');
const {authenticate, authenticateUser }= require('../backend/middleware/authenticate')
const app = require('../backend/server');
//const bcrypt = require('bcrypt')

chai.use(chaiHttp);
const expect = chai.expect;
const should = require('chai').should() //actually call the function


 describe('Users API', function ()  {
  describe('GET /users', function() {
    this.timeout(30000)
    
    it('returns a list of users if admin', function(done) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU5NDk0MzR9.14mgvK87afz6VluqsWfDrusy6PfCQLTuLGkrsYzP0e8'
        request(app).get('/api/users')
           .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end(function(err, res) {
                expect(res.body.should.be.an('array'))
                done(err);
            });
    });    
    it('does not return a list of users if not an admin', function(done) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZDM3Yjg2NDBkNTE4YmI5ZGU5ZDUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3NTk3NzA4N30.OOR37C6X1iRGBZvRLBv3bzkeGCedtD3YqmJH5nMIaGw'
        request(app).get('/api/users')
           .set('Authorization', `Bearer ${token}`)
            .expect(401)
            .end(function(err, res) {
              expect(res.body).to.have.property('error', 'Unauthorised access. Reserved for admins');
              done(err);
            });
    });
});

describe('GET specific /user by id', function() {
  this.timeout(30000)
  it('returns a specified user id if admin', function(done) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU5NDk0MzR9.14mgvK87afz6VluqsWfDrusy6PfCQLTuLGkrsYzP0e8'
      request(app).get('/api/users/63e5a0cfedc3c4a014052516')
         .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end(function(err, res) {
              expect(res.body.should.be.an('object'))
              expect(res.body.should.have.property('names'));
              expect(res.body.should.have.property('email'));
              expect(res.body.should.have.property('username'));
              expect(res.body.should.have.property('password'));
              done(err);
          });
  });
  it('returns an error message if user is not found', function(done) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU5NDk0MzR9.14mgvK87afz6VluqsWfDrusy6PfCQLTuLGkrsYzP0e8'
      request(app).get('/api/users/fakeuser')
         .set('Authorization', `Bearer ${token}`)
          .expect(404)
          .end(function(err, res) {
            expect(res.body).to.have.property('error', "User doesn't exist!");
              done(err);
          });
  });    
});

 // In this test it's expected to create a new user
 describe('Create new /user', function() {
  this.timeout(30000)
  it('Creates a new user', function(done) {
 const newUser = {
 names: 'ishime',
 username: 'ishimweee',
 email: 'ishime1234jgg@gmail.com',
 password: 'ishimweee',
 role: 'user'
};
      request(app).post('/api/users')
          .expect(201)
          .send(newUser)
          .end(function(err, res) {
              expect(res.body.should.be.an('object'))
              expect(res.body.should.have.property('names'));
              expect(res.body.should.have.property('username'));
              expect(res.body.should.have.property('email'));
              expect(res.body.should.have.property('password'));
              expect(res.body.should.have.property('role'));
              done(err);
          });
  });
  it('returns an error if a validation fails', function(done) {
    const newUser = {
    names: 'ishime',
    username: 'ishimweee',
    email: 'ishime1234gmail.com',
    password: 'ishimweee',
    role: 'user'
   };
         request(app).post('/api/users')
             .expect(400)
             .end(function(err, res) {
                 done(err);
             });
     });
     it('returns an error if a user already exists', function(done) {
      const newUser = {
      names: 'ishime',
      username: 'ishimwe',
      email: 'ishimwe2@gmail.com',
      password: 'ishimweee',
      role: 'user'
     };
           request(app).post('/api/users')
               .expect(409)
               .end(function(err, res) {
                   done(err);
               });
       });
});

//  ---Updates an existing user----
describe('Updates an existing /user', function() {
  this.timeout(30000)
  it('Updates an existing /user', function(done) {
 const updatedBlog = {
  names: 'ishime',
  username: 'ishimwez',
  email: 'ishimwez2yttyt@gmail.com',
  password: 'ishimweee',
  role: 'user'
};   
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU5NDk0MzR9.14mgvK87afz6VluqsWfDrusy6PfCQLTuLGkrsYzP0e8'
      request(app).put('/api/users/63e5a0cfedc3c4a014052516')
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .send(updatedBlog)
          .end(function(err, res) {
            expect(res.body).to.have.property('message', "User updated successfully");
              done(err);
          });
  });
  it('returns if an existing /user not found', function(done) {
    const updatedBlog = {
     names: 'ishime',
     username: 'ishimwez',
     email: 'ishimwez2yttyt@gmail.com',
     password: 'ishimweee',
     role: 'user'
   };   
         const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU5NDk0MzR9.14mgvK87afz6VluqsWfDrusy6PfCQLTuLGkrsYzP0e8'
         request(app).put('/api/users/63e5a0cfedc3c4a014052516a')
             .set('Authorization', `Bearer ${token}`)
             .expect(404)
             .end(function(err, res) {
                 done(err);
             });
     });
  it('Returns if /user validation fails', function(done) {
    const updatedBlog = {
     names: 'ishime',
     username: 'ishimwez-',
     email: 'ishimwez2gmail.com',
     password: 'ishimweee',
     role: 'user'
   };   
         const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU5NDk0MzR9.14mgvK87afz6VluqsWfDrusy6PfCQLTuLGkrsYzP0e8'
         request(app).put('/api/users/63e5a0cfedc3c4a014052516')
             .set('Authorization', `Bearer ${token}`)
             .expect(400)
             .end(function(err, res) {
                 done(err);
             });
     });
});


 // --DELETE A User---
 describe('Delete a user', function () {
  it('Should delete a user', function (done) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzYxMjM3MzR9.HBxfACniY8egA2EkI_1q-ENJhIle0OwmoLfDJe-JjnE'
    request(app)
      .delete('/api/users/63e5a0cfedc3c4a014052516')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  it('Should return an error if user is not found', function (done) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU4NjUyNTl9.TbKN4QM3WEj1ur14frA8ZgUW6xqZ9XbmKzHt9GeGX0w'
    request(app)
      .delete('/api/users/fakeuser')
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  it('Should not delete a user if not an admin', function (done) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZDM3Yjg2NDBkNTE4YmI5ZGU5ZDUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3NTk3NzA4N30.OOR37C6X1iRGBZvRLBv3bzkeGCedtD3YqmJH5nMIaGw'
    request(app)
      .delete('/api/users/63d9320c9b96fc24d92655f0')
      .set('Authorization', `Bearer ${token}`)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
 })

  // --DELETE All Users---
  describe('Delete a user', function () {
    it('Should delete all users', function (done) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzYxMjM3MzR9.HBxfACniY8egA2EkI_1q-ENJhIle0OwmoLfDJe-JjnE'
      request(app)
        .delete('/api/users/63e5a0cfedc3c4a014052516')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

  })


})

 
