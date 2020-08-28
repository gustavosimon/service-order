import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import CreateCustomerService from '../services/CreateCustomerService';
import Customer from '../models/Customer';

export default class CustomerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, type, register_number, adress } = request.body;

    const createCustomer = new CreateCustomerService();

    const customer = await createCustomer.execute({
      name,
      type,
      register_number,
      adress,
    });

    return response.json(customer);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const customerRepository = getRepository(Customer);

    const allCustomers = await customerRepository.find();

    return response.json(allCustomers);
  }
}
