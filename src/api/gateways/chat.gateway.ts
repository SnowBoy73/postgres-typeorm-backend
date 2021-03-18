import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WelcomeDto} from '../dtos/welcome.dto';
import { Inject } from '@nestjs/common';

import {
  IChatService,
  IChatServiceProvider,
} from '../../core/primary-ports/chat.service.interface';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
      @Inject(IChatServiceProvider) private chatService: IChatService,
  ) {}

  @WebSocketServer() server;

  @SubscribeMessage('message')
  handleChatEvent(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    const ts = Date.now();
    const date_ob = new Date(ts);
    const date = date_ob.getDate();
    const month = date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();
    const hour = date_ob.getHours();
    const minute = date_ob.getMinutes();
    const second = date_ob.getSeconds();
    let minZero = '';
    if (minute < 10) {
      minZero = '0';
    }
    let secZero = '';
    if (second < 10) {
      secZero = '0';
    }
    const sentAt = year + '-' + month + '-' + date + '@' + hour + ':' + minZero + minute + ':' + secZero + second;
    const chatMessage = this.chatService.addMessage(message, client.id, sentAt);
    this.server.emit('newMessage', chatMessage);
  }

  @SubscribeMessage('typing')
  handleTypingEvent(
    @MessageBody() typing: boolean,
    @ConnectedSocket() client: Socket,
  ): void {
    const chatClient = this.chatService.updateTyping(typing, client.id);
    if (chatClient) {
      this.server.emit('clientTyping', chatClient);
    }
  }

  // FOR PROMISE
  @SubscribeMessage('nickname')
  async handleNicknameEvent(
      @MessageBody() nickname: string,
      @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try
    {
      const chatClient = await this.chatService.addClient(client.id, nickname)
      console.log('chatClient', chatClient)
      const chatClients = await this.chatService.getClients();
      const welcome: WelcomeDto =
        {
          clients: chatClients,
          messages: this.chatService.getMessages(),
          client: chatClient,
        };
      client.emit('welcome', welcome);
      this.server.emit('clients', chatClients);
    } catch (e) {
    client.error(e.message );
    }
  }

  // FOR OBSERVABLE??
  /*@SubscribeMessage('nickname')
  handleNicknameEvent(
    @MessageBody() nickname: string,
    @ConnectedSocket() client: Socket,
  ): void {
    try
    {
      this.chatService.addClient(client.id, nickname)
        .subscribe((chatClient) =>
        {
          const welcome: WelcomeDto =
          {
            clients: this.chatService.getClients(),
            messages: this.chatService.getMessages(),
            client: chatClient,
          };
          client.emit('welcome', welcome);
          this.server.emit('clients', this.chatService.getClients());
        });
    } catch (e) {
      client.emit('chat-error', { error: e.message });
    }
  }
   */

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    console.log('Client Connect', client.id);
    client.emit('allMessages', this.chatService.getMessages());
    this.server.emit('clients', await this.chatService.getClients());
  }

  async handleDisconnect(client: Socket): Promise<any> {
    await this.chatService.deleteClient(client.id);
    this.server.emit('clients', this.chatService.getClients());
    console.log('Client Disconnect', await this.chatService.getClients());
  }
}
