import { ChatClientDto } from './chat-client.dto';
import { ChatMessageDto } from './chat-message.dto';
export declare class ChatService {
    allMessages: ChatMessageDto[];
    clients: ChatClientDto[];
    addMessage(message: string, clientId: string, sentAt: string): ChatMessageDto;
    addClient(id: string, nickname: string): ChatClientDto;
    getClients(): ChatClientDto[];
    getMessages(): ChatMessageDto[];
    delete(id: string): void;
    updateTyping(typing: boolean, id: string): ChatClientDto;
}
