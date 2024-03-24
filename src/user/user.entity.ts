import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password?: string;

  @Column(({ default: 1 }))
  version: number;

  @CreateDateColumn()
  createdAt: number;

  @CreateDateColumn()
  updatedAt: number;
}