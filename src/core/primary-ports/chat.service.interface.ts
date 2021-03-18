import { ChatMessage } from '../models/chat-message.model';
import { ChatClient } from '../models/chat-client.model';
import {Observable} from 'rxjs';

export const IChatServiceProvider = 'IChatServiceProvider';
export interface IChatService {
    addMessage(message: string, clientId: string, sentAt: string): Observable<ChatMessage>;

    addClient(id: string, nickname: string): Promise<ChatClient>;

    getClients(): ChatClient[];  // NEW observable

    getMessages(): ChatMessage[];

    deleteClient(id: string): void;

    updateTyping(typing: boolean, id: string): ChatClient;
}
