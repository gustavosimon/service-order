import { getRepository } from 'typeorm';

import Product from '../models/Product';
import AppError from '../../errors/AppError';

interface Request {
  description: string;
}

export default class CreateProductService {
  public async execute({ description }: Request): Promise<Product> {
    const productRepository = getRepository(Product);

    const existsProduct = await productRepository.findOne({
      where: { description },
    });

    if (existsProduct) {
      throw new AppError('Product already exists');
    }

    const product = productRepository.create({ description });

    await productRepository.save(product);

    return product;
  }
}
