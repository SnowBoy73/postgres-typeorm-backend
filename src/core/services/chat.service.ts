import { Injectable } from '@nestjs/common';
import {ChatMessage} from '../models/chat-message.model';
import {ChatClient} from '../models/chat-client.model';
import { InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {IChatService} from '../primary-ports/chat.service.interface';
import Client from '../../infrastructure/data-source/entities/client.entity';
import {of} from 'rxjs';

@Injectable()
export class ChatService implements IChatService {
  allMessages: ChatMessage[] = [];
  clients: ChatClient[] = [];



  constructor(
      @InjectRepository(Client)
      private clientRepository: Repository<Client>) {}


  addMessage(message: string, clientId: string, sentAt: string): ChatMessage
  {
    const client = this.clients.find((c) => c.id === clientId);
    const chatMessage: ChatMessage = {
      message: message,
      sender: client,
      sentAt: sentAt,
    };
    this.allMessages.push(chatMessage);
    return chatMessage;
  }

  async addClient(id: string, nickname: string): Promise<ChatClient> {
    let chatClient = this.clients.find(
      (c) => c.nickname === nickname && c.id === id,
    );
    if (chatClient) {
      return chatClient;
    }
    if (this.clients.find((c) => c.nickname === nickname)) {
      throw new Error('Nickname already in use');
    }
    chatClient = {id: id, nickname: nickname,};
    const client = this.clientRepository.create();
    client.nickname = nickname;
    await this.clientRepository.save(client);
    chatClient = { id: '' + client.id, nickname: nickname}
    return of(chatClient).toPromise();
  }

  getClients(): ChatClient[] {
    return this.clients;
  }

  getMessages(): ChatMessage[] {
    return this.allMessages;
  }

  deleteClient(id: string) {
    this.clients = this.clients.filter((c) => id !== id);
  }

  updateTyping(typing: boolean, id: string): ChatClient {
    const chatClient = this.clients.find((c) => c.id === id);
    if (chatClient && chatClient.typing !== typing) {
      chatClient.typing = typing;
      return chatClient;
    }
  }
}
