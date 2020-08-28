import { getRepository } from 'typeorm';
import Customer from '../models/Customer';
import AppError from '../../errors/AppError';

interface Request {
  name: string;
  type: 'F' | 'J';
  register_number: number;
  adress: string;
}

export default class CreateCustomerService {
  public async execute({
    name,
    type,
    register_number,
    adress,
  }: Request): Promise<Customer> {
    const customerRepository = getRepository(Customer);

    const existsCustomer = await customerRepository.findOne({
      where: {
        type,
        register_number,
      },
    });

    if (existsCustomer) {
      throw new AppError('Customer register number already exists');
    }

    const customer = customerRepository.create({
      name,
      type,
      register_number,
      adress,
    });

    await customerRepository.save(customer);

    return customer;
  }
}
