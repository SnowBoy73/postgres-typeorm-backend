"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("../../infrastructure/data-source/entities/client.entity");
const message_entity_1 = require("../../infrastructure/data-source/entities/message.entity");
const operators_1 = require("rxjs/operators");
const internal_compatibility_1 = require("rxjs/internal-compatibility");
let ChatService = class ChatService {
    constructor(clientRepository, messageRepository) {
        this.clientRepository = clientRepository;
        this.messageRepository = messageRepository;
        this.allMessages = [];
        this.clients = [];
    }
    addMessage(message, clientId, sentAt) {
        const client = this.clients.find((c) => c.id === clientId);
        const msg = this.messageRepository.create();
        msg.message = message,
            msg.senderId = clientId,
            msg.sentAt = sentAt;
        return internal_compatibility_1.fromPromise(this.messageRepository.save(msg))
            .pipe(operators_1.map((dbMessage) => {
            return { message: '' + message, sender: client, sentAt: sentAt };
        }));
    }
    async addClient(id, nickname) {
        const clientDb = await this.clientRepository.findOne({ nickname: nickname });
        if (!clientDb) {
            let client = this.clientRepository.create();
            client.id = id;
            client.nickname = nickname;
            client = await this.clientRepository.save(client);
            return { id: '' + client.id, nickname: client.nickname };
        }
        if (clientDb.id === id) {
            return { id: clientDb.id, nickname: clientDb.nickname };
        }
        else {
            throw new Error('Nickname already in use');
        }
    }
    async getClients() {
        const clients = await this.clientRepository.find();
        const chatClients = JSON.parse(JSON.stringify(clients));
        return chatClients;
    }
    async getMessages() {
        const messages = await this.messageRepository.find();
        console.log('Messages = ', messages);
        const chatMessages = JSON.parse(JSON.stringify(messages));
        return chatMessages;
    }
    async deleteClient(id) {
        await this.clientRepository.delete({ id: id });
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
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(client_entity_1.default)),
    __param(1, typeorm_1.InjectRepository(message_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map