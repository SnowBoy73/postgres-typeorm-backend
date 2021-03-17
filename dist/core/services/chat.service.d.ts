import { ChatMessage } from '../models/chat-message.model';
import { ChatClient } from '../models/chat-client.model';
import { Repository } from 'typeorm';
import { IChatService } from '../primary-ports/chat.service.interface';
import Client from '../../infrastructure/data-source/entities/client.entity';
export declare class ChatService implements IChatService {
    private clientRepository;
    allMessages: ChatMessage[];
    clients: ChatClient[];
    constructor(clientRepository: Repository<Client>);
    addMessage(message: string, clientId: string, sentAt: string): ChatMessage;
    addClient(id: string, nickname: string): Promise<ChatClient>;
    getClients(): ChatClient[];
    getMessages(): ChatMessage[];
    deleteClient(id: string): void;
    updateTyping(typing: boolean, id: string): ChatClient;
}
