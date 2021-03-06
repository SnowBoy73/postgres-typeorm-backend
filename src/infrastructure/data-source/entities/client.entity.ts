import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Client {
  @ PrimaryColumn({unique: true})
  public id: string;

  @Column({unique: true})
  public nickname: string;
}

export default Client;
