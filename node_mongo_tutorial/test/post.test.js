const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const request= require('supertest');
const app = require('../backend/server');


chai.use(chaiHttp);
const expect = chai.expect;
const should = require('chai').should() //actually call the function

describe('Blog API', async function ()  {
      describe('GET /posts', function() {
        this.timeout(30000)
        
        it('returns a list of posts', function(done) {
            request(app).get('/api/posts')
                .expect(200)
                .end(function(err, res) {
                    expect(res.body.should.be.an('array'))
                    done(err);
                });
        });
    });

      // In this test it's expected a post with specified ID
      describe('GET specific /posts/:id', function() {
        this.timeout(30000)
        it('returns a specific post by ID', function(done) {
           request(app).get('/api/posts/63e4c0f987df977eedc7e000')
               
                .expect(200)
                .end(function(err, res) {
                    expect(res.body.should.be.an('object'))
                    expect(res.body.should.have.property('title'));
                    expect(res.body.should.have.property('content'));
                    done(err);
                });
        });
    });

      // In this test it's expected to create a new post
      describe('Create new /post', function() {
        this.timeout(30000)
        it('Creates a new post', function(done) {
       const newBlog = {
       title: 'Test MDMDytr',
       content: 'This is a test blog post.',
     };
            request(app).post('/api/posts')
                .expect(201)
                .send(newBlog)
                .end(function(err, res) {
                    expect(res.body.should.be.an('object'))
                    expect(res.body.should.have.property('title'));
                    expect(res.body.should.have.property('content'));
                    done(err);
                });
        });
    });
    
    // In this test it's expected not to new post if post is already there
    describe('Create new /post', function() {
      this.timeout(30000)
      it('Does not Create a new post since same post title is already there', function(done) {
     const newBlog = {
     title: 'Test MDMDDMDMD',
     content: 'This is a test blog post.',
   };
          request(app).post('/api/posts')
              .expect(403)
              .send(newBlog)
              .end(function(err, res) {
                  done(err);
              });
      });
  });

      //  ---Updates an existing post----
    describe('Updates an existing /post', function() {
      this.timeout(30000)
      it('Updates an existing /post', function(done) {
     const updatedBlog = {
     title: 'Updated Test NOWNOWuuuuutiuytuN',
     content: 'This is a test blog post.',
   };   
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU5NDk0MzR9.14mgvK87afz6VluqsWfDrusy6PfCQLTuLGkrsYzP0e8'
          request(app).put('/api/posts/63e4f7a1cd00aac4082a6280')
              .set('Authorization', `Bearer ${token}`)
              .expect(200)
              .send(updatedBlog)
              .end(function(err, res) {
                  expect(res.body.should.be.an('object'))
                  done(err);
              });
      });
  });
      // --DELETE A POST---
   describe('Delete a post', function () {
     it('Should delete a post only if admin', function (done) {
       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU4NjUyNTl9.TbKN4QM3WEj1ur14frA8ZgUW6xqZ9XbmKzHt9GeGX0w'
       request(app)
         .delete('/api/posts/63e4fabcf3c866dabf570536')
         .set('Authorization', `Bearer ${token}`)
         .expect(200)
         .end((err, res) => {
           if (err) return done(err);
          // expect(res.body).to.have.property('message', 'Post deleted successfully');
           done();
         });
     });

     it('Should not delete post if post does not exist', function (done) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU4NjUyNTl9.TbKN4QM3WEj1ur14frA8ZgUW6xqZ9XbmKzHt9GeGX0w'
      request(app)
        .delete('/api/posts/q')
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
         // expect(res.body).to.have.property('message', 'Post deleted successfully');
          done();
        });
    });

   })


  }) 