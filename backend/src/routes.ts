import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import CustomerController from './app/controllers/CustomerController';
import ProductController from './app/controllers/ProductController';
import ServiceOrderController from './app/controllers/ServiceOrderController';

import ensureAuthenticate from './app/middlewares/ensureAuthenticate';

const routes = Router();

const sessionController = new SessionController();
const userController = new UserController();
const customerController = new CustomerController();
const productController = new ProductController();
const serviceOrderController = new ServiceOrderController();

routes.post('/sessions', sessionController.create);
routes.post('/users', userController.create);

routes.use(ensureAuthenticate);

routes.get('/users', userController.index);

routes.post('/customers', customerController.create);
routes.put('/customers/:id', customerController.update);
routes.get('/customers', customerController.index);

routes.post('/products', productController.create);
routes.get('/products', productController.index);

routes.post('/service-order', serviceOrderController.create);
routes.get('/service-order', serviceOrderController.index);

export default routes;
