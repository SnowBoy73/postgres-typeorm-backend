import { ChatMessage } from '../models/chat-message.model';
import { ChatClient } from '../models/chat-client.model';
import { Repository } from 'typeorm';
import { IChatService } from '../primary-ports/chat.service.interface';
import Client from '../../infrastructure/data-source/entities/client.entity';
import Message from '../../infrastructure/data-source/entities/message.entity';
import { Observable } from 'rxjs';
export declare class ChatService implements IChatService {
    private clientRepository;
    private messageRepository;
    allMessages: ChatMessage[];
    clients: ChatClient[];
    constructor(clientRepository: Repository<Client>, messageRepository: Repository<Message>);
    addMessage(message: string, clientId: string, sentAt: string): Observable<ChatMessage>;
    addClient(id: string, nickname: string): Promise<ChatClient>;
    getClients(): Promise<ChatClient[]>;
    getMessages(): Promise<ChatMessage[]>;
    deleteClient(id: string): Promise<void>;
    updateTyping(typing: boolean, id: string): ChatClient;
}
