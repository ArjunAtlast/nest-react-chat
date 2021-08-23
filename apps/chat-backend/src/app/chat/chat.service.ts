import { Injectable } from '@nestjs/common';
import { ListMap } from '../../ds/list-map';
import { Message } from '@wkart/interfaces';
import { Session } from '@wkart/interfaces';

@Injectable()
export class ChatService {

  #messages: ListMap<string, Message>;
  #sessions: Map<string, Session>;

  constructor() {
    this.#messages = new ListMap();
    this.#sessions = new Map();
  }

  createSession(session: Session): Session {
    session.id = this.generateSessionId(session);
    if (this.#sessions.has(session.id)) {
      return this.#sessions.get(session.id);
    }
    this.#sessions.set(session.id, session);
    this.#messages.set(session.id, []);
    return session;
  }

  getMessages(sesId: string): Message[] {
    return this.#messages.get(sesId);
  }

  writeMessage(sesId: string, message: Message): Message {
    message.id = this.generateUID();
    message.createdAt = new Date().toISOString();
    this.#messages.push(sesId, message);
    return message;
  }

  readMessage(sesId: string, prevId: string) {
    const start = this.#messages.get(sesId).findIndex((message) => message.id === prevId);
    return this.#messages.readFrom(sesId, start);
  }

  private generateSessionId(session: Session): string {
    return Buffer.from(`${session.productId}:${session.userId}`).toString('base64');
  }

  private generateUID(): string {
    return `${new Date().getTime()}/${Math.random().toString(26).substr(2)}`;
  }
}
