import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
  role: 'A' | 'S' | 'D';
}

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
    role,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = userRepository.create({ name, email, password, role });
    await userRepository.save(user);
    return user;
  }
}
