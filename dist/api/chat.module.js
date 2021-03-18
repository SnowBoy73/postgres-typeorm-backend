"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("./gateways/chat.gateway");
const chat_service_1 = require("../core/services/chat.service");
const chat_service_interface_1 = require("../core/primary-ports/chat.service.interface");
const typeorm_1 = require("@nestjs/typeorm");
const client_entity_1 = require("../infrastructure/data-source/entities/client.entity");
const message_entity_1 = require("../infrastructure/data-source/entities/message.entity");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([client_entity_1.default, message_entity_1.default])],
        providers: [
            chat_gateway_1.ChatGateway,
            {
                provide: chat_service_interface_1.IChatServiceProvider,
                useClass: chat_service_1.ChatService,
            },
        ],
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map