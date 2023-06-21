const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const sanitizer = require('perfect-express-sanitizer');

//errores
const AppError = require('./utils/appError');
const handlerError = require('./controllers/error.controller');

//rutas
const usersRouter = require('./routes/users.routes');
const repairsRouter = require('./routes/repairs.routes');

const app = express();
const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 5000,
  message: 'Too many requests from this IP, please try again in one hour',
});

//middlewares
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(hpp());
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('api/v1', limiter);

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

// errors
app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(express.json());

app.use((req, res, next) => {
  const time = new Date().toISOString();

  req.requestTime = time;
  next();
});

app.use(handlerError);

module.exports = app;
