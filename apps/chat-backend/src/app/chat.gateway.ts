import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Message } from '@wkart/interfaces';
import { Session } from '@wkart/interfaces';
import { ChatService } from './chat/chat.service';
import { products } from '../db/products';
import { users } from '../db/users';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('session')
  createSession(@MessageBody() session: Session): Session {
    session = this.chatService.createSession(session);
    this.server.emit(`chat.session.${session.productId}.new`, session);
    session.product = products.find(product => product.id === session.productId);
    session.user = users.find(user => user.id === session.userId);
    session.chats = this.chatService.getMessages(session.id);
    return session;
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: Message) {
    console.log(message)
    message = this.chatService.writeMessage(message.sessionId, message);
    message.user = users.find(user => user.id === message.userId);
    this.server.emit(`chat.message.${message.sessionId}.new`, message);
  }
}
