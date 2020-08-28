import { Router } from 'express';

import UserController from './app/controllers/UserController';
import CustomerController from './app/controllers/CustomerController';
import ProductController from './app/controllers/ProductController';
import ServiceOrderController from './app/controllers/ServiceOrderController';

const routes = Router();

const userController = new UserController();
const customerController = new CustomerController();
const productController = new ProductController();
const serviceOrderController = new ServiceOrderController();

routes.post('/users', userController.create);
routes.get('/users', userController.index);

routes.post('/customers', customerController.create);
routes.put('/customers/:id', customerController.update);
routes.get('/customers', customerController.index);

routes.post('/products', productController.create);
routes.get('/products', productController.index);

routes.post('/service-order', serviceOrderController.create);
routes.get('/service-order', serviceOrderController.index);

export default routes;
