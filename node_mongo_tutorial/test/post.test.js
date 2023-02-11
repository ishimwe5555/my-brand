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
                    //expect(res.body.should.have.property('title'));
                   // expect(res.body.should.have.property('content'));
                    done(err);
                });
        });
        it('does not return any post if not found', function(done) {
          request(app).get('/api/posts/1')
              
               .expect(404)
               .end(function(err, res) {
                   done(err);
               });
       });
    });

      // In this test it's expected to create a new post
      describe('Create new /post', function() {
        this.timeout(30000)
        it('Creates a new post', function(done) {
       const newBlog = {
       title: 'Test xzyyyzz',
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
        it('does not Create a new post if title and content fields are empty', function(done) {
          const newBlog = {
         // title: '',
         // content: '',
        };
               request(app).post('/api/posts')
                   .expect(400)
                   .end(function(err, res) {
                       done(err);
                   });
           });
           it('does not Create a new post if it already exists', function(done) {
            const newBlog = {
            title: 'Post1',
            content: 'existing post',
          };
                 request(app).post('/api/posts')
                     .expect(403)
                     .end(function(err, res) {
                      expect(res.body).to.have.property('message', "Post already exists");
                         done(err);
                     });
             });
    });

      //  ---Updates an existing post----
    describe('Updates an existing /post', function() {
      this.timeout(30000)
      it('Updates an existing /post', function(done) {
     const updatedBlog = {
     title: 'Updated Test zzyyt',
     content: 'This is a test blog post.',
   };   
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU5NDk0MzR9.14mgvK87afz6VluqsWfDrusy6PfCQLTuLGkrsYzP0e8'
          request(app).put('/api/posts/63e7a3591aee7ce768ee66b1')
              .set('Authorization', `Bearer ${token}`)
              .expect(200)
              .send(updatedBlog)
              .end(function(err, res) {
                  expect(res.body.should.be.an('object'))
                  expect(res.body.should.have.property('title'));
                  expect(res.body.should.have.property('content'));
                  done(err);
              });
      });
      it('Does not Update an existing /post if not an admin', function(done) {
        const updatedBlog = {
        title: 'Updated Test zzyyt',
        content: 'This is a test blog post.',
      };   
             const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZDM3Yjg2NDBkNTE4YmI5ZGU5ZDUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3NTk3NzA4N30.OOR37C6X1iRGBZvRLBv3bzkeGCedtD3YqmJH5nMIaGw'
             request(app).put('/api/posts/63e4d7de026ec6165af47491')
                 .set('Authorization', `Bearer ${token}`)
                 .expect(403)
                 .end(function(err, res) {
                  expect(res.body).to.have.property('error', 'Unauthorised access. You can only update your own post.');
                     done(err);
                 });
         });
  });
      // --DELETE A POST---
   describe('Delete a post', function () {
     it('Should not delete a post if not an admin', function (done) {
       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZDM3Yjg2NDBkNTE4YmI5ZGU5ZDUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3NTk3NzA4N30.OOR37C6X1iRGBZvRLBv3bzkeGCedtD3YqmJH5nMIaGw'
       request(app)
         .delete('/api/posts/63e4cc69964b5530b79b7ce7')
         .set('Authorization', `Bearer ${token}`)
         .expect(403)
         .end((err, res) => {
           if (err) return done(err);
           expect(res.body).to.have.property('error', 'Unauthorised access. Reserved for admins');
           done();
         });
     });

     it('Should not delete post if post does not exist', function (done) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU4NjUyNTl9.TbKN4QM3WEj1ur14frA8ZgUW6xqZ9XbmKzHt9GeGX0w'
      request(app)
        .delete('/api/posts/q')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
         // expect(res.body).to.have.property('message', 'Post not found');
          done();
        });
    });
    it('Should delete an existing post', function (done) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU4NjUyNTl9.TbKN4QM3WEj1ur14frA8ZgUW6xqZ9XbmKzHt9GeGX0w'
      request(app)
        .delete('/api/posts/63e7a3591aee7ce768ee66b1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('id', '63e4fc20ac000149c043f7f5');
          done();
        });
    });
   })

     // --DELETE ALL POSTS---
     describe('Delete all posts', function () {
      it('Should not delete the posts if not an admin', function (done) {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZDM3Yjg2NDBkNTE4YmI5ZGU5ZDUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3NTk3NzA4N30.OOR37C6X1iRGBZvRLBv3bzkeGCedtD3YqmJH5nMIaGw'
        request(app)
          .delete('/api/posts/')
          .set('Authorization', `Bearer ${token}`)
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.have.property('error', 'Unauthorised access. Reserved for admins');
            done();
          });
      });
 
     it('Should delete all posts', function (done) {
       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzYWM5Njc3MWQ5ZjZlMzZkNjEwMDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzYxMjM3MzR9.HBxfACniY8egA2EkI_1q-ENJhIle0OwmoLfDJe-JjnE'
       request(app)
         .delete('/api/posts/')
         .set('Authorization', `Bearer ${token}`)
         .expect(403)
         .end((err, res) => {
           if (err) return done(err);
           expect(res.body).to.have.property('message', 'All posts are deleted');
           done();
         });
     });
    })

    // In this test it's expected to create a new comment
 describe('Create new /comment', function() {
  this.timeout(30000)
  it('adds a new comment to a post', function(done) {
 const newUser = {
 post: '63e4d7de026ec6165af47491',
 user: '63dc52193a86ad2bec2939f1',
 text: 'ishime comment',
};
      request(app).post('/api/posts/63e7a34c1aee7ce768ee66ae/comments')
          .expect(201)
          .send(newUser)
          .end(function(err, res) {
              expect(res.body.should.be.an('object'))
              expect(res.body.should.have.property('post'));
              expect(res.body.should.have.property('user'));
              expect(res.body.should.have.property('text'));
              done(err);
          });
  });
  it('returns an error if no comment', function(done) {
    const newUser = {
      post: '63e4d7de026ec6165af47491',
      user: '63dc52193a86ad2bec2939f1',
      //text: 'ishime comment',
   };
         request(app).post('/api/users')
             .expect(400)
             .end(function(err, res) {
                 done(err);
             });
     });
    })
    // In this test it's expected to get all comments
 describe('Get all /comment', function() {
  this.timeout(30000)
  it('gets all comments', function(done) {
      request(app).post('/api/posts/63e7a30f1aee7ce768ee66aa/comments')
          .expect(200)
          .end(function(err, res) {
              expect(res.body.should.be.an('array'))
              done(err);
          });
    });
    })


  }) 