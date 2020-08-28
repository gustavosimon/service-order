import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../../errors/AppError';

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

    const existsUser = await userRepository.findOne({ where: { email } });

    if (existsUser) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await userRepository.save(user);

    return user;
  }
}
