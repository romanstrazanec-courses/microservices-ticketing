import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from "cookie-session";

import {currentUserRouter} from "./routes/current-user";
import {singoutRouter} from "./routes/signout";
import {singinRouter} from "./routes/signin";
import {singupRouter} from "./routes/singup";
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUserRouter);
app.use(singupRouter);
app.use(singoutRouter);
app.use(singinRouter);

app.all('*', async (req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};