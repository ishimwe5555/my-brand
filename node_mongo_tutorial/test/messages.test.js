const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const request= require('supertest');
const app = require('../backend/server');


chai.use(chaiHttp);
const expect = chai.expect;
const should = require('chai').should() 

describe('Messages API', async function ()  {
      describe('GET /messages', function() {
        this.timeout(30000)
        
        it('returns a list of all messages', function(done) {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4OWY0NDUzZDczMGJlOTgxZDliNzUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzYxODk1NTB9.HTOX3IZGihDHwy74W_-GRR6KqLGCiAn3_h0EGspoHQ4'
            request(app).get('/api/messages')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .end(function(err, res) {
                    expect(res.body.should.be.an('array'))
                   
                    done(err);
                });
        });
        it('returns an error if not token is invalid', function(done) {
            const token = 'eyJhbGciOiJ[IUzI1NiIsInR5cCI6IkpXVCJ9..14mgvK87afz6VluqsWfDrusy6PfCQLTuLGkrsYzP0e8jk'
            request(app).get('/api/messages')
                .set('Authorization', `Bearer ${token}`)
                .end(function(err, res) {   
                    res.should.have.status(400);                
                    done();
                });
        });
        it('returns an error if user is not logged admin', function(done) { 
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZDM3Yjg2NDBkNTE4YmI5ZGU5ZDUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3NTk3NzA4N30.OOR37C6X1iRGBZvRLBv3bzkeGCedtD3YqmJH5nMIaGw'
            request(app).get('/api/messages')
                .set('Authorization', `Bearer ${token}`)
                .expect(403)
                .end(function(err, res) {     
                    done(err);
                });
        });
      })
     // In this test it's expected to return a message with specified ID
     describe('GET specific /messages/:id', function() {
        this.timeout(30000)
        it('returns a specific message by ID', function(done) {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4OWY0NDUzZDczMGJlOTgxZDliNzUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzYxODk1NTB9.HTOX3IZGihDHwy74W_-GRR6KqLGCiAn3_h0EGspoHQ4'
           request(app).get('/api/messages/63e25c902de1abb2b802be17')
                .set('Authorization', `Bearer ${token}`)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.statusCode).to.equal(200);                    expect(res.body.should.be.an('object'))
                    expect(res.body.should.have.property('names'));
                    expect(res.body.should.have.property('email'));
                    expect(res.body.should.have.property('content'));
                    done();
                });
        });
          it('does not return a message if not admin', function(done) {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZDM3Yjg2NDBkNTE4YmI5ZGU5ZDUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3NTk3NzA4N30.OOR37C6X1iRGBZvRLBv3bzkeGCedtD3YqmJH5nMIaGw'
           request(app).get('/api/messages/63e25c902de1abb2b802be17')
                .set('Authorization', `Bearer ${token}`)
                .expect(403)
                .end(function(err, res) {
                    done(err);
                });
        });
    });    

    // In this test it's expected to send a new message
    describe('Create new /message', function() {
        this.timeout(30000)
        it('Sends a new message', function(done) {
       const newMessage = {
       names: 'ishimwe',
       email: 'ishimwezasavvbs@gmail.com',
       content: 'New message'
     };
            request(app).post('/api/messages')
                .send(newMessage)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.statusCode).to.equal(201);
                    expect(res.body.should.be.an('object'))
                    expect(res.body.should.have.property('names'));
                    expect(res.body.should.have.property('email'));
                    expect(res.body.should.have.property('content'));
                    done();
                });
        });
        it('returns error upon validation error', function(done) {
            const newMessage = {
            names: 'ishimwe',
            email: 'invalid email',
            content: 'New message'
          };
                 request(app).post('/api/messages')
                     .expect(400)
                     .end(function(err, res) {
                         done(err);
                     });
             });
    });

          //  ---Updates an existing message----
          describe('Updates an existing /message', function() {
            this.timeout(30000)
            it('Updates an existing /message', function(done) {
           const updatedBlog = {
           names: 'ishimwe',
           email: 'zzzzzzdddjujjd@gmail.com',
           content: 'a new message inbox'
         };   
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4OWY0NDUzZDczMGJlOTgxZDliNzUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzYxODk1NTB9.HTOX3IZGihDHwy74W_-GRR6KqLGCiAn3_h0EGspoHQ4'
                request(app).put('/api/messages/63e25c902de1abb2b802be17')
                    .set('Authorization', `Bearer ${token}`)
                    .send(updatedBlog)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.statusCode).to.equal(200);
                        expect(res.body.should.be.an('object'))
                        expect(res.body.should.have.property('names'));
                        expect(res.body.should.have.property('email'));
                        expect(res.body.should.have.property('content'));
                        done();
                    });
            });
            it('Should not Update /message if not admin', function(done) {
                const updatedBlog = {
                names: 'ishimwe',
                email: 'zzzzzzdddd@gmail.com',
                content: 'a new message inbox'
              };   
                     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZDM3Yjg2NDBkNTE4YmI5ZGU5ZDUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3NjEyNDcyOH0.MqdbC98m7Gs--zdmfU74qMc0_CwSUITUn1eY1ZKYRVA'
                     request(app).put('/api/messages/63e25c902de1abb2b802be17')
                         .set('Authorization', `Bearer ${token}`)
                         .expect(401)
                         .end(function(err, res) {
                             expect(res.body.should.be.an('object'))
                         });
                 });
                 it('Should not Update /message if it is not found', function(done) {
                    const updatedBlog = {
                    names: 'ishimwe',
                    email: 'zzzzzzddddjj@gmail.com',
                    content: 'a new message inbox'
                  };   
                         const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4OWY0NDUzZDczMGJlOTgxZDliNzUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzYxODk1NTB9.HTOX3IZGihDHwy74W_-GRR6KqLGCiAn3_h0EGspoHQ4'
                         request(app).put('/api/messages/63e25c902de1abb2b802jhjhbe17')
                             .set('Authorization', `Bearer ${token}`)
                             .expect(200)
                             .end(function(err, res) {
                                 done(err);
                             });
                     });
        });
 // --DELETE ALL Messages---
 describe('Delete all messages', function () {
    it('Should not delete the messages if not an admin', function (done) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZDM3Yjg2NDBkNTE4YmI5ZGU5ZDUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3NTk3NzA4N30.OOR37C6X1iRGBZvRLBv3bzkeGCedtD3YqmJH5nMIaGw'
      request(app)
        .delete('/api/messages/')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(403);            
          expect(res.body).to.have.property('error', 'Unauthorised access. Reserved for admins');
          done();
        });
    });

   it('Should delete all messages', function (done) {
     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzYxMjM3MzR9.HBxfACniY8egA2EkI_1q-ENJhIle0OwmoLfDJe-JjnE'
     request(app)
       .delete('/api/messages/')
       .set('Authorization', `Bearer ${token}`)
       .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(200);           
         done();
       });
   });
  })


})