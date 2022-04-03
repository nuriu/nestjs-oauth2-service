import { Client } from 'src/client/client.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class AuthorizationCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  authorizationCode: string;

  @ManyToOne(() => Client)
  client: Client;

  @ManyToOne(() => User)
  user: User;

  @Column('timestamp')
  expiresAt: Date;

  @Column('text')
  redirectUri: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
