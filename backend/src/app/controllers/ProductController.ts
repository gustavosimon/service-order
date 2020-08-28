import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import CreateProductService from '../services/CreateProductService';
import Product from '../models/Product';

export default class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({ description });

    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const productRepository = getRepository(Product);

    const allProducts = await productRepository.find();

    return response.json(allProducts);
  }
}
