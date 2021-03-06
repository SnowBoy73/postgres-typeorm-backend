import { Injectable } from '@nestjs/common';
import {ChatMessage} from '../models/chat-message.model';
import {ChatClient} from '../models/chat-client.model';
import { InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {IChatService} from '../primary-ports/chat.service.interface';
import Client from '../../infrastructure/data-source/entities/client.entity';
import Message from '../../infrastructure/data-source/entities/message.entity';
import {async, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable()
export class ChatService implements IChatService {
  allMessages: ChatMessage[] = [];
  clients: ChatClient[] = [];


  constructor(
      @InjectRepository(Client)
      private clientRepository: Repository<Client>,
      @InjectRepository(Message)
      private messageRepository: Repository<Message>
  ) {}

    // USING PROMISE
    addMessage(message: string, clientId: string, sentAt: string): Observable<ChatMessage>
    {
        const client = this.clients.find((c) => c.id === clientId);
        const msg = this.messageRepository.create();
        msg.message = message,
            msg.senderId = clientId,
            msg.sentAt = sentAt;
        return fromPromise(this.messageRepository.save(msg))
            .pipe(
                map((dbMessage) => {
                    return { message: '' + message, sender: client, sentAt: sentAt };
                })
            );
    }

    // USING OBSERVABLE
    /* addMessage(message: string, clientId: string, sentAt: string): Observable<ChatMessage>
    {
      const client = this.clients.find((c) => c.id === clientId);
      const msg = this.messageRepository.create();
      msg.message = message,
      msg.senderId = clientId,
      msg.sentAt = sentAt;
      return fromPromise(this.messageRepository.save(msg))
          .pipe(
              map((dbMessage) => {
                  return { message: '' + message, sender: client, sentAt: sentAt };
              })
          );
  }
  */

    // USING PROMISE
    async addClient(id: string, nickname: string): Promise<ChatClient> {
       const clientDb = await this.clientRepository.findOne({nickname: nickname})
       if(!clientDb) {
           let client = this.clientRepository.create();
           client.id = id;
           client.nickname = nickname;
           client = await this.clientRepository.save(client);
           return {id: '' + client.id, nickname: client.nickname};
       }
       if (clientDb.id === id) {
         return {id: clientDb.id, nickname: clientDb.nickname};
       } else {
         throw new Error('Nickname already in use');
       }
    }

  // USING OBSERVABLE
  /*   addClient(id: string, nickname: string): Observable<ChatClient> {
    let chatClient = this.clients.find(
      (c) => c.nickname === nickname && c.id === id,
    );
    if (chatClient) {
      return of(chatClient);
    }
    if (this.clients.find((c) => c.nickname === nickname)) {
      throw new Error('Nickname already in use');
    }
    const client = this.clientRepository.create();
    client.nickname = nickname;
    return fromPromise(this.clientRepository.save(client))
        .pipe(
            map((dbClient) => {
              return { id: '' + client.id, nickname: nickname };
            })
        );
  }
  */

    async getClients(): Promise<ChatClient[]> {
      const clients = await this.clientRepository.find();
      const chatClients: ChatClient[] = JSON.parse(JSON.stringify(clients));
      return chatClients;
  }

  async getMessages(): Promise<ChatMessage[]> {
      const messages = await this.messageRepository.find();
      console.log('Messages = ', messages);
      const chatMessages: ChatMessage[] = JSON.parse(JSON.stringify(messages));
      return chatMessages;
  }

  async deleteClient(id: string): Promise<void> {
      await this.clientRepository.delete({id: id});
  }

  updateTyping(typing: boolean, id: string): ChatClient {
    const chatClient = this.clients.find((c) => c.id === id);
    if (chatClient && chatClient.typing !== typing) {
      chatClient.typing = typing;
      return chatClient;
    }
  }
}
