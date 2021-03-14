import {ChatClientDto} from '../../chat/shared/chat-client.dto';

export interface ChatMessage {
    message: string;
    sender: ChatClientDto;
    sentAt: string;
}
