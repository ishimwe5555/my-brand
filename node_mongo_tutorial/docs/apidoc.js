const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Blogs Api",
        version: "1.0.0",
        description: "Blogs, Messages and User apis",
        contact: {
          name: "Norbert Ishimwe", 
          email: "ishimwe96@gmail.com", 
          url: "web.com",
        },
      },
      servers: [
        {
          url: 'https://my-brand-production-5e26.up.railway.app/',
          description: 'Local Server',
        }
      ],
    },
    apis: ['backend/routes/*.js'],
  }

module.exports = options