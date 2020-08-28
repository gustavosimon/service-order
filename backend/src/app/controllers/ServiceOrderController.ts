import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import CreateServiceOrder from '../services/CreateServiceOrder';
import ServiceOrder from '../models/ServiceOrder';

export default class ServiceOrderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      owner_id,
      operator_id,
      customer_id,
      product_id,
      status,
      diagnosis,
    } = request.body;

    const createServiceOrder = new CreateServiceOrder();

    const serviceOrder = await createServiceOrder.execute({
      owner_id,
      operator_id,
      customer_id,
      product_id,
      status,
      diagnosis,
    });

    return response.json(serviceOrder);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const serviceOrderRepository = getRepository(ServiceOrder);

    const allServiceOrder = await serviceOrderRepository.find();

    return response.json(allServiceOrder);
  }
}
