import express, { Router } from 'express';
import authRoutes from './authorization';
// import all of your routes from their files

const routes = Router();

/** ********* API ENTRYPOINT **************************** */

const entryPoint = Router();
entryPoint.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome' });
});

/** ********* UPLOADS ENDPOINT ************************** */

const uploads = ('/uploads', express.static('uploads'));

/** ********** ALL ENDPOINTS *************************** */

routes.use(entryPoint, authRoutes, uploads);

export default routes;
