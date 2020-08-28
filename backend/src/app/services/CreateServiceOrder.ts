import { getRepository } from 'typeorm';

import User from '../models/User';
import Product from '../models/Product';
import Customer from '../models/Customer';
import ServiceOrder from '../models/ServiceOrder';
import AppError from '../../errors/AppError';

interface Request {
  owner_id: number;
  operator_id: number;
  customer_id: number;
  product_id: number;
  status?: 'P' | 'A' | 'D';
  diagnosis: string;
}

export default class CreateServiceOrder {
  public async execute({
    owner_id,
    operator_id,
    customer_id,
    product_id,
    status = 'P',
    diagnosis,
  }: Request): Promise<ServiceOrder> {
    const serviceOrderRepository = getRepository(ServiceOrder);
    const userRepository = getRepository(User);
    const productRepository = getRepository(Product);
    const customerRepository = getRepository(Customer);

    const existsOwnerId = await userRepository.findOne({
      where: { id: owner_id },
    });

    if (!existsOwnerId) throw new AppError('Owner ID does not exists');

    const existsOperatorId = await userRepository.findOne({
      where: { id: operator_id },
    });

    if (!existsOperatorId) throw new AppError('Operator ID does not exists');

    const existsProductId = await productRepository.findOne({
      where: { id: product_id },
    });

    if (!existsProductId) throw new AppError('Product does not exists');

    const existsCustomerId = await customerRepository.findOne({
      where: { id: customer_id },
    });

    if (!existsCustomerId) throw new AppError('Customer does not exists');

    const serviceOrder = serviceOrderRepository.create({
      owner_id,
      operator_id,
      product_id,
      customer_id,
      status,
      diagnosis,
    });

    await serviceOrderRepository.save(serviceOrder);

    return serviceOrder;
  }
}
