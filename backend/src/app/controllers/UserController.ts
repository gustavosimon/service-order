import CreateUserService from '../services/CreateUserService';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = new CreateUserService();
    const { name, email, password, role } = request.body;
    const user = await createUser.execute({ name, email, password, role });
    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);
    const allUsers = await userRepository.find();
    return response.json(allUsers);
  }
}
