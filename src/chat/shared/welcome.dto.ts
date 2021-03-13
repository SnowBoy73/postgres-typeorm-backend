import { ChatClientDto } from './chat-client.dto';
import { ChatMessageDto } from './chat-message.dto';

export interface WelcomeDto {
  clients: ChatClientDto[];
  client: ChatClientDto;
  messages: ChatMessageDto[];
}
