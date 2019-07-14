import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import flash from 'express-flash';

import routes from "./routes";

const app = express();

app.set('trust proxy', 'loopback');

app.use(
  cors({
    origin(origin, cb) {
      const whitelist = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',')
        : [];
      cb(null, whitelist.includes(origin));
    },
    credentials: true,
  }),
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//  app.use(session({}),); :TODO add session middleware with redis support;
/*app.use(passport.initialize());
app.use(passport.session());*/ // :TODO add passport support;
app.use(flash());
app.use(routes);

export default app;
