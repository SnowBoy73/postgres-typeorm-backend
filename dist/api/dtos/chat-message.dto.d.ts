import { ChatClientDto } from './chat-client.dto';
export interface ChatMessageDto {
    message: string;
    sender: ChatClientDto;
    sentAt: string;
}
