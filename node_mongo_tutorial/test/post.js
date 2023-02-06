const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const request= require('supertest');
const app = require('../backend/server');


chai.use(chaiHttp);
const expect = chai.expect;
const should = require('chai').should() //actually call the function


describe('Blog API', () => {
  it('Should return a list of all blogs', async () => {
    request(app)
      .get('/api/posts')
      .expect(200)
      .expect((res) => {
        const posts = res.body;
       // console.log(posts);
        posts.should.be.an('array');
        //posts.length.should.be.above(0);
      })
  });

  it('Should return a specific blog by id', async () => {
    request(app)
      .get('/api/posts/63dcda44f3449e9f0813c3d1')
      .expect(200)
      .expect((res) => {
        const blog = res.body;
        blog.should.be.an('object');
        blog.should.have.property('title');
        blog.should.have.property('content');
      })
  });

  it('Should create a new blog', async () => {
    const newBlog = {
      title: 'Test Blog',
      content: 'This is a test blog post.'
    };

    request(app)
      .post('/api/posts')
      .send(newBlog)
      .expect(201)
      .expect((res) => {
        const blog = res.body;
        blog.should.be.an('object');
        blog.should.have.property('title', newBlog.title);
        blog.should.have.property('content', newBlog.content);
      })
  });

  it('Should update an existing blog', async () => {
    const updatedBlog = {
      title: 'Updated Blog',
      content: 'This is an updated test blog post.'
    };

    request(app)
      .put('/api/posts/63dcda44f3449e9f0813c3d1')
      .send(updatedBlog)
      .expect(200)
      .expect((res) => {
        const blog = res.body;
        blog.should.be.an('object');
        blog.should.have.property('title', updatedBlog.title);
        blog.should.have.property('content', updatedBlog.content);
      })
  });

  it('Should delete a blog', async () => {
    request(app)
      .delete('/api/posts/63dcda44f3449e9f0813c3d1')
      .expect(204)
  });
});