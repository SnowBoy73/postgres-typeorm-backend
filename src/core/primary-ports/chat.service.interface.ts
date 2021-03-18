import { ChatMessage } from '../models/chat-message.model';
import { ChatClient } from '../models/chat-client.model';
import {Observable} from 'rxjs';

export const IChatServiceProvider = 'IChatServiceProvider';
export interface IChatService {
    addMessage(message: string, clientId: string, sentAt: string): Observable<ChatMessage>;

    addClient(id: string, nickname: string): Promise<ChatClient>;

    getClients(): Promise<ChatClient[]>;

    getMessages(): Promise<ChatMessage[]>;

    deleteClient(id: string): Promise<void>;

    updateTyping(typing: boolean, id: string): ChatClient;
}
