const express = require('express');
const app = express()
const morgan = require("morgan")

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.use(express.json());
app.use(morgan('dev'))

var check_routes = require('./routes/check');
// var price_routes = require('./routes/price')
// const text = require("./routes/test")

// app.use('/check', text);
app.use('/check', check_routes);
// app.use('/price', price_routes);

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});


app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})
