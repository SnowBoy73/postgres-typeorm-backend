import { ChatClientDto } from './chat-client.dto';
import { ChatMessageDto } from './chat-message.dto';

// NOT USED - OLD

export interface WelcomeDto {
  clients: ChatClientDto[];
  client: ChatClientDto;
  messages: ChatMessageDto[];
}
