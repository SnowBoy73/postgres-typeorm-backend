"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
let ChatService = class ChatService {
    constructor() {
        this.allMessages = [];
        this.clients = [];
    }
    addMessage(message, clientId, sentAt) {
        const client = this.clients.find((c) => c.id === clientId);
        const chatMessage = {
            message: message,
            sender: client,
            sentAt: sentAt,
        };
        this.allMessages.push(chatMessage);
        return chatMessage;
    }
    addClient(id, nickname) {
        let chatClient = this.clients.find((c) => c.nickname === nickname && c.id === id);
        if (chatClient) {
            return chatClient;
        }
        if (this.clients.find((c) => c.nickname === nickname)) {
            throw new Error('Nickname already in use');
        }
        chatClient = {
            id: id,
            nickname: nickname,
        };
        this.clients.push(chatClient);
        return chatClient;
    }
    getClients() {
        return this.clients;
    }
    getMessages() {
        return this.allMessages;
    }
    deleteClient(id) {
        this.clients = this.clients.filter((c) => id !== id);
    }
    updateTyping(typing, id) {
        const chatClient = this.clients.find((c) => c.id === id);
        if (chatClient && chatClient.typing !== typing) {
            chatClient.typing = typing;
            return chatClient;
        }
    }
};
ChatService = __decorate([
    common_1.Injectable()
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map