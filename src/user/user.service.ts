import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async getOne(id: number): Promise<User> {
    const user = this.repository.findOne(id);
    if (user) {
      return user;
    }

    return null;
  }

  async create(user: User) {
    const newUser = this.repository.create(user);
    await this.repository.save(newUser);

    return newUser;
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
