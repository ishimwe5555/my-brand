const User = require('../backend/models/userModel') ;
const chai = require('chai') ;
const server = require('../backend/server') ;
const dotenv = require('dotenv') ;
const mongoose = require('mongoose') ;
const chaiHttp = require('chai-http') ;
const cookieParser = require('cookie-parser') ;
const fs = require('fs') 
const path = require('path') ;
const { fileURLToPath } = require('url') ;

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
const currentFilePath = path.resolve(__dirname, __filename);

dotenv.config();


chai.should();
chai.use(chaiHttp);
chai.use(cookieParser)


describe('Database connecting', function() {
    var testUserSignup = {
        names : "ishimwe",
        username: "admin",
        email: "admin@mail.com",
        password: "password"
      };
      var testUserLogin = {
        email: "admin@mail.com",
        password: "password"
      };

    console.log(currentFilePath)
    // before(function (done) {
    //   mongoose.connect(process.env.MONGO_URI);
    //   const db = mongoose.connection;
    //   db.on('error', console.error.bind(console, 'connection error'));
    //   db.once('open', function() {
    //   console.log('Database Connected successfully!');
    //     done();
    //   });
    // });

    describe('Testing User Routes ',function () {

      it('it should Not GET all the Users Not logged In', (done) => {
        chai.request(server)
        .get('/api/users')
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
          });
      });
      
      it('it should Not POST a user to database *SignUp* due to bad email format ', (done) => {
        const number = Math.floor(Math.random() * 100 )
        var testUser = {
          username: `Test User${number} Created`,
          email: `Test${number}@mailcom`,
          password: 'Qwerty@'
        };
        chai.request(server)
        .post('/api/users').send(testUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message')
          done();
        });
      });
      it('it should Not POST a user to database *SignUp* due to short username ', (done) => {
        const number = Math.floor(Math.random() * 100 )
        var testUser = {
          username: `${number}`,
          email: `Test${number}@mail.com`,
          password: 'Qwerty@'
        };
        chai.request(server)
        .post('/api/users/').send(testUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message')
          done();
        });
      });
      it('it should Not POST a user to database *SignUp* due to wrong password ', (done) => {
        const number = Math.floor(Math.random() * 100 )
        var testUser = {
          username: `Test User${number} Created`,
          email: `Test${number}@mail.com`,
          password: 'Qwerty@'
        };
        chai.request(server)
        .post('/api/users').send(testUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
      });


      it('it should Not Login a user due to missing fields ', (done) => {
        var testUser = {
          password: 'Qwerty12345'
        };
        chai.request(server)
        .post('/api/users/login').send(testUser)
        .end((err, res) => {
         res.should.have.status(404);
         res.body.should.be.a('object');
         res.body.should.have.property('message').eql('User not found');
          done();
        });
      });
      it('it should --Send-- --GET--  --DELETE-- a message and get and delete', (done) => {
       
        chai.request(server)
        .post('/api/users/login')
        .set('content-type', 'application/json')
        .send(testUserLogin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User authenticated');
          res.body.should.have.property('token');
          const token = `Bearer ${res.header['x-auth-token']}`
          const message = {
                names: "message test",
                email: "message@mail.com",
                content: "Hello 202"
            }
          chai.request(server)
          .post('/api/messages/').send(message)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('names').eql('message test');
            res.body.should.have.property('email').eql('message@mail.com')
            res.body.should.have.property('content').eql('Hello 202')
            const msg = res.body._id
            //console.log(msg);
            chai.request(server)
            .get(`/api/messages/${msg}`).set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              });

            chai.request(server)
            .get('/api/messages').set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
              });

            chai.request(server)
            .delete(`/api/messages/${msg}`).set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done()
              });

          });
        });

      })
      it('it should --CREATE-- --GET-- --UPDATE-- --DELETE-- a blog and get and delete', (done) => {

      chai.request(server)
      .post('/api/users/login')
      .set('content-type', 'application/json')
      .send(testUserLogin)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User authenticated');
        res.body.should.have.property('token');
        const token = `Bearer ${res.header['x-auth-token']}`
          const blog = {
                title: "blog test586",
                content: "Hello 202"
            }
          chai.request(server)
          .post('/api/posts/').send(blog)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql('blog test586');
            res.body.should.have.property('content').eql('Hello 202')
          const blog = res.body._id

          chai.request(server)
            .get(`/api/posts/${blog}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
            });
          chai.request(server)
            .get('/api/posts')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
            });

          chai.request(server)
          .post(`/api/posts/${blog}/likes`)
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');

            // chai.request(server)
            // .put(`/blogs/b/${blog}/like`)
            // .set('Cookie', cookie)
            // .end((err, res) => {
            //   res.should.have.status(200);
            //   res.body.should.be.a('object');
            // });
          });

          chai.request(server)
          .post(`/api/posts/${blog}/comments`)
          .set('Authorization', token)
          .send({ text: "My First Comment" })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
          })

          chai.request(server)
          .get(`/api/posts/${blog}/comments`)
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
          })


          chai.request(server)
          .put(`/api/posts/${blog}`)
          .set('content-type', 'application/json')
          .set('Authorization', token)
          .field('title', 'Admin can Post Blog Updated')
          .field('content', 'Blog Post Updated')
          //.attach('blogImage',
          //fs.readFileSync(path.join(__dirname, './test_image.jpg')),
          //'test_image.jpg')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            if (err) { console.log(err) }
            
            chai.request(server)
            .delete(`/api/posts/${blog}`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              if (err) { console.log(err) }
              done()
            });

          });

        });
      });

      })
      it('it should --CREATE-- --UPDATE USERNAME --READ-- --DELETE-- a user ', (done) => {

      chai.request(server)
        .post('/api/users/login')
        .set('content-type', 'application/json')
        .send(testUserLogin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User authenticated');
          //res.body.should.have.property('LoggedInAs');
          const token = res.header['x-auth-token']
          
          chai.request(server).post('/api/users/')
          .set('content-type', 'application/json')
          .send(testUserSignup)
          .end((err, res) => {

            const user = res.body._id
            //const token2 = res.header['x-auth-token']
            res.should.have.status(200);
            res.body.should.be.a('object');

            chai.request(server)
            .get(`/api/users/${user}`)
            .set('Authorization', token)
            .end(( err, res ) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('names').eql('ishimwe');
              res.body.should.have.property('username').eql('admin');
              res.body.should.have.property('email').eql('admin@mail.com');
              res.body.should.have.property('password').eql('password');
            })

            chai.request(server)
            .get('/api/users')
            .set('Authorization', token)
            .end(( err, res ) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
            })

            chai.request(server)
            .put(`/api/users/${user}`)
            .send({names:'ishimwe',email:'password@gmail.com',password:'password34',  username: "admin105" })
            .set('Authorization', token)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
            });

            chai.request(server)
            .delete(`api/users/${user}`)
            .set('Authorization', token)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('id').eql(user);
              done();
            });
          })
        });

      })
      it('it should  --UPDATE-- PROFILE PICTURE --READ-- --DELETE-- a user ', (done) => {

      chai.request(server)
        .post('/api/users/login')
        .set('content-type', 'application/json')
        .send(testUserLogin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User authenticated');
          //res.body.should.have.property('LoggedInAs');
          const cookie = res.header['x-auth-token']
          

          chai.request(server).post('/api/users/')
          .set('content-type', 'application/json')
          .send(testUserSignup)
          .end(async (err, res) => {

            const user = res.body._id
            const cookie2 = res.header['x-auth-token']
            res.should.have.status(201);
            res.body.should.be.a('object');

            // await chai.request(server).put('/users/edit/profilepic')
            // .set('Cookie', cookie2)
            // .attach('profile_pic',
            // fs.readFileSync(path.join(__dirname, '../assets/test_image.jpg')),
            // 'test_image.jpg')
            // .then((res) => {
            //   res.should.have.status(200);
            //   res.body.should.be.a('object');
            //   done()
            // })

            chai.request(server)
            .delete('/api/users/' + user)
            .set('Cookie', cookie)
            .then((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('id').eql(user);
              done();
            });
          })

        });

      })
      it('it should --UPDATE-- PASSWORD --READ-- --DELETE-- a user ', (done) => {

      chai.request(server)
        .post('/api/users/login')
        .set('content-type', 'application/json')
        .send(testUserLogin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User authenticated');
          //res.body.should.have.property('LoggedInAs');
          const cookie = res.header['x-auth-token']
          

          chai.request(server).post('/api/users/')
          .set('content-type', 'application/json')
          .send(testUserSignup)
          .end((err, res) => {

            const user = res.body._id
            const cookie2 = res.header['x-auth-token']
            res.should.have.status(200);
            res.body.should.be.a('object');
          

            chai.request(server)
            .put(`/api/users/${user}`)
            .set('Authorization', cookie)
            .send({ names : 'ishimwe', username : 'ish100', email: 'ish100@ish.com',password: "Qwerty12345" })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('User updated successfully')
            });

            chai.request(server)
            .delete(`/api/users/${user}`)
            .set('Authorization', cookie)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('id').eql(user);
              done();
            });
          })

        });

      })
      
      it('it should *Not add --Comments-- if not logged in', (done) => {
        chai.request(server)
        .post('/api/posts/63ebe5323bd8d81b28bf50d0/comments')
        .end((err, res) => {
          res.should.have.status(401);
          //res.body.should.be.a('obect');
          res.body.should.have.property('error').eql('Access denied. No token provided')
          done();
        });
      })
      it('it should *Not POST an Admin user to database *SignUpAdmin* duplicate admins ', (done) => {
        chai.request(server)
        .post('/api/users/').send({ names:"norbert", username: "user", email: "user@mail.com", password: "password" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message')

          done();
        });
      });   
      it('it should login and logout safely', (done) => {
        chai.request(server)
        .post('/api/users/login')
        .set('content-type', 'application/json')
        .send(testUserLogin)
        .end((err, res) => {
          res.should.have.status(200);
          chai.request(server)
          // .get('api/users/logout')
          // .end((err,res) => {
          //   res.should.have.status(404);
            done()
         // })
        })
      }) 
      it('it should login With Errors', (done) => {
        chai.request(server)
        .post('/api/users/login')
        .set('content-type', 'application/json')
        .send({ email: "user@mail.com", password: "WrongP12345" })
        .end((err, res) => {
          res.should.have.status(400);
        })

        chai.request(server)
        .post('/api/users/login')
        .set('content-type', 'application/json')
        .send({ email: "userz@mail.com", password: "WrongP12345" })
        .end((err, res) => {
          res.should.have.status(404);
          done()
        })

      }) 
      it('it should try to get users but no admin privileges', (done) => {
        chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('error').eql('Access denied. No token provided')
          done()
        })
      }) 

    })

});

