import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public message: string;

    @Column()
    senderId: string;

    @Column()
    sentAt: string;
}

export default Message;
