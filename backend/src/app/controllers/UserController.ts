import CreateUserService from '../services/CreateUserService';
import { Request, Response } from 'express';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = new CreateUserService();
    const { name, email, password, role } = request.body;
    const user = await createUser.execute({ name, email, password, role });
    return response.json(user);
  }
}
