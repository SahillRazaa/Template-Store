const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require('express-rate-limit');
const mainRouter = require('./routes');

const app = express();

app.use(helmet());
app.use(cookieParser());

const corsOptions = {
  origin: [process.env.CORS_ORIGIN],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

app.get('/api/health', (_, res) => {
  res.status(200).json({ status: 'ok', message: "Template Store API is running...." });
});

app.use('/api', mainRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
