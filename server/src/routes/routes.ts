import express from 'express';
import authRoutes from './auth.routes';
import movieRoutes from './movie.routes';

const router = express.Router();

export default (): express.Router => {
    authRoutes(router);
    movieRoutes(router);
    return router;
}