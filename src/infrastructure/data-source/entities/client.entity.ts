import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nickname: string;
}

export default Client;
