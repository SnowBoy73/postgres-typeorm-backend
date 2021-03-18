import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { IChatService } from '../../core/primary-ports/chat.service.interface';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    constructor(chatService: IChatService);
    server: any;
    handleChatEvent(message: string, client: Socket): Promise<void>;
    handleTypingEvent(typing: boolean, client: Socket): void;
    handleNicknameEvent(nickname: string, client: Socket): Promise<void>;
    handleConnection(client: Socket, ...args: any[]): Promise<any>;
    handleDisconnect(client: Socket): Promise<any>;
}
