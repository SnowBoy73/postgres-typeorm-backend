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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const chat_service_interface_1 = require("../../core/primary-ports/chat.service.interface");
let ChatGateway = class ChatGateway {
    constructor(chatService) {
        this.chatService = chatService;
    }
    handleChatEvent(message, client) {
        const ts = Date.now();
        const date_ob = new Date(ts);
        const date = date_ob.getDate();
        const month = date_ob.getMonth() + 1;
        const year = date_ob.getFullYear();
        const hour = date_ob.getHours();
        const minute = date_ob.getMinutes();
        const second = date_ob.getSeconds();
        let minZero = '';
        if (minute < 10) {
            minZero = '0';
        }
        let secZero = '';
        if (second < 10) {
            secZero = '0';
        }
        const sentAt = year + '-' + month + '-' + date + '@' + hour + ':' + minZero + minute + ':' + secZero + second;
        const chatMessage = this.chatService.addMessage(message, client.id, sentAt);
        this.server.emit('newMessage', chatMessage);
    }
    handleTypingEvent(typing, client) {
        const chatClient = this.chatService.updateTyping(typing, client.id);
        if (chatClient) {
            this.server.emit('clientTyping', chatClient);
        }
    }
    handleNicknameEvent(nickname, client) {
        try {
            this.chatService.addClient(client.id, nickname)
                .then((chatClient) => {
                const welcome = {
                    clients: this.chatService.getClients(),
                    messages: this.chatService.getMessages(),
                    client: chatClient,
                };
                client.emit('welcome', welcome);
                this.server.emit('clients', this.chatService.getClients());
            });
        }
        catch (e) {
            client.emit('chat-error', { error: e.message });
        }
    }
    handleConnection(client, ...args) {
        console.log('Client Connect', client.id);
        client.emit('allMessages', this.chatService.getMessages());
        this.server.emit('clients', this.chatService.getClients());
    }
    handleDisconnect(client) {
        this.chatService.deleteClient(client.id);
        this.server.emit('clients', this.chatService.getClients());
        console.log('Client Disconnect', this.chatService.getClients());
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('message'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleChatEvent", null);
__decorate([
    websockets_1.SubscribeMessage('typing'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleTypingEvent", null);
__decorate([
    websockets_1.SubscribeMessage('nickname'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleNicknameEvent", null);
ChatGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __param(0, common_1.Inject(chat_service_interface_1.IChatServiceProvider)),
    __metadata("design:paramtypes", [Object])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map