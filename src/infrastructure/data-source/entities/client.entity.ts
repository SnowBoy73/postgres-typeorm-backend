import { number, string } from '@hapi/joi';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nickname: string;
}
