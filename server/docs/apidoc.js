import { createUser } from "./users.js"

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Blogs Api",
        version: "1.0.0",
        description: "Blogs, Messages and User apis",
        contact: {
          name: "Ishimwe Norbert", 
          email: "ishimwe96@gmail.com", 
          url: "web.com",
        },
      },
      servers: [
        {
          url: 'https://my-portfolio-production-2587.up.railway.app/',
          description: 'Api server',
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    apis: ['src/routes/users.js', 'src/routes/blogs.js', 'src/routes/messages.js'],
}

export default options