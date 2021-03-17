import { Module } from '@nestjs/common';
import { ChatGateway } from './gateways/chat.gateway';
import { ChatService } from '../core/services/chat.service';
import { IChatServiceProvider} from '../core/primary-ports/chat.service.interface';
import {TypeOrmModule} from '@nestjs/typeorm';
import Client from '../infrastructure/data-source/entities/client.entity';

//NEW
@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [
    ChatGateway,
    {
      provide: IChatServiceProvider,
      useClass: ChatService,
    },
  ],
})
export class ChatModule {}

//OLD - WORKS
/*
@Module({
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
*/
