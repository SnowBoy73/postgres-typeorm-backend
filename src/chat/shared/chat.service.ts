import { Injectable } from '@nestjs/common';
import { ChatClientDto } from './chat-client.dto';
import { ChatMessageDto } from './chat-message.dto';

@Injectable()
export class ChatService {
  allMessages: ChatMessageDto[] = [];
  clients: ChatClientDto[] = [];

  addMessage(
    message: string,
    clientId: string,
    sentAt: string,
  ): ChatMessageDto {
    const client = this.clients.find((c) => c.id === clientId);
    const chatMessage: ChatMessageDto = {
      message: message,
      sender: client,
      sentAt: sentAt,
    };
    this.allMessages.push(chatMessage);
    return chatMessage;
  }

  addClient(id: string, nickname: string): ChatClientDto {
    let chatClient = this.clients.find(
      (c) => c.nickname === nickname && c.id === id,
    );
    if (chatClient) {
      return chatClient;
    }
    if (this.clients.find((c) => c.nickname === nickname)) {
      throw new Error('Nickname already in use');
    }
    chatClient = {
      id: id,
      nickname: nickname,
    };
    this.clients.push(chatClient);
    return chatClient;
  }

  getClients(): ChatClientDto[] {
    return this.clients;
  }

  getMessages(): ChatMessageDto[] {
    return this.allMessages;
  }

  delete(id: string) {
    this.clients = this.clients.filter((c) => id !== id);
  }

  updateTyping(typing: boolean, id: string): ChatClientDto {
    const chatClient = this.clients.find((c) => c.id === id);
    if (chatClient && chatClient.typing !== typing) {
      chatClient.typing = typing;
      return chatClient;
    }
  }
}
