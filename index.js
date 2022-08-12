require('dotenv').config();
const express = require('express');
require('express-async-errors');
const errorMiddleware = require('./middlewares/error.middleware');

const productsRoute = require('./routes/products.route');
const salesRoute = require('./routes/sales.route');

const app = express();

app.use(express.json());

app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.use(errorMiddleware);

// não altere  esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
