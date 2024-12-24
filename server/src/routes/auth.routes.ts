import express from 'express';
import { UserLoginFunction } from '../auth/user.login';
import { UserRegisterFunction } from '../auth/user.register';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { UserLogoutFunction } from '../auth/user.logout';
import { asyncHandler } from '../middlewares/async.handler';

export default (router: express.Router) => {
    router.post('/auth/register', UserRegisterFunction as express.RequestHandler);
    router.post('/auth/login', UserLoginFunction as express.RequestHandler);
    router.post('/auth/logout', isAuthenticated as express.RequestHandler, asyncHandler(UserLogoutFunction));
}
