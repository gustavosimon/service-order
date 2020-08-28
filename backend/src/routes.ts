import { Router } from 'express';

import UserController from './app/controllers/UserController';
import CustomerController from './app/controllers/CustomerController';
import ProductController from './app/controllers/ProductController';

const routes = Router();

const userController = new UserController();
const customerController = new CustomerController();
const productController = new ProductController();

routes.post('/users', userController.create);
routes.get('/users', userController.index);

routes.post('/customers', customerController.create);
routes.get('/customers', customerController.index);

routes.post('/products', productController.create);
routes.get('/products', productController.index);

export default routes;
