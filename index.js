require('dotenv').config();
require('express-async-errors');
const express = require('express');
const productsRoute = require('./routes/products.route');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());

app.get('/products', productsRoute);

app.use(errorMiddleware);

// não altere  esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
