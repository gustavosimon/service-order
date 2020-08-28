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

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, adress } = request.body;

    const customerRepository = getRepository(Customer);

    const customer = await customerRepository.findOne({ where: { id } });

    if (!customer)
      return response.status(404).json({ message: 'Customer does not exists' });

    if (name) customer.name = name;
    if (adress) customer.adress = adress;

    await customerRepository.save(customer);

    return response.json(customer);
  }
}
