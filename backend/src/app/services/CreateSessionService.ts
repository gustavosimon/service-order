import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import AppError from '../../errors/AppError';

import AuthConfig from '../../config/auth';

interface Request {
  email: string;
  password: string;
}

export default class CreateSessionService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ user: User; token: string }> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) throw new AppError('Incorrect email/password combination', 401);

    console.log(password, user.password);

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched)
      throw new AppError('Incorrect email/password combination', 401);

    const { secretKey, expiresIn } = AuthConfig;

    const token = sign({}, secretKey, {
      subject: String(user.id),
      expiresIn,
    });

    return { user, token };
  }
}
