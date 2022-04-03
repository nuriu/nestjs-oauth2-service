import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Grant {
  ClientCredentials = 'client_credentials',
  AuthorizationCodes = 'authorization_code',
  RefreshToken = 'refresh_token',
  Password = 'password',
}

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  clientId: string;

  @Column({
    nullable: false,
  })
  clientSecret: string;

  @Column('simple-array', {
    nullable: false,
  })
  redirectUris: string[];

  @Column('simple-array', {
    nullable: false,
  })
  grants: Grant[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public constructor(init?: Partial<Client>) {
    Object.assign(this, init);
  }
}
