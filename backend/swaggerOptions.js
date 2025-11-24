const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Music API',
      description: 'Music Product API Information',
      version: '1.0.0',
      contact: { name: 'Developer' },
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerOptions;
