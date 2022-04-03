import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private saltOrRounds = 10;

  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async getOneByUsername(username: string): Promise<User> {
    return await this.repository.findOne({
      where: { username: username },
    });
  }

  async getOneById(id: number): Promise<User> {
    const user = this.repository.findOne(id);
    if (user) {
      return user;
    }

    throw new NotFoundException('user not found');
  }

  async create(user: User) {
    try {
      const hash = await bcrypt.hash(user.password, this.saltOrRounds);
      user.password = hash;

      const newUser = this.repository.create(user);
      return await this.repository.save(newUser);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError.code == 23505
      ) {
        throw new BadRequestException('user already exists');
      }
    }
  }

  async update(id: number, user: User) {
    await this.repository.update(id, user);
    const updatedUser = await this.repository.findOne(id);
    if (updatedUser) {
      return user;
    }

    return null;
  }

  async delete(id: number) {
    const deletedUser = await this.repository.delete(id);
    return deletedUser.affected;
  }
}
