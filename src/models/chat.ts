import * as mobx from "mobx";
import { MobxObservable, MobxObservableArray } from "../types";
import Auth from "./auth";

export type ChatMessage = {
  readonly id: MobxObservable<string>;
  readonly text: MobxObservable<string>;
  readonly date: MobxObservable<Date>;
  readonly senderId: MobxObservable<string>;
};

type CanSendResult =
  | true
  | {
      emptyMessage: boolean;
      messageIsTooLong:
        | false
        | {
            maxLength: 50;
          };
    };

class Chat {
  @mobx.observable
  private _messages: MobxObservableArray<ChatMessage> = [
    {
      id: Date.now().toString(),
      date: new Date(),
      text: "initial message",
      senderId: this.auth.currentUser.id,
    },
  ];

  constructor(private auth: Auth) {
    mobx.makeAutoObservable(this);
  }

  @mobx.computed
  get messages(): Readonly<MobxObservableArray<ChatMessage>> {
    return this._messages;
  }

  @mobx.computed
  canSend(text: string): MobxObservable<CanSendResult> {
    if (!text) {
      return {
        emptyMessage: true,
        messageIsTooLong: false,
      };
    }

    if (text.length > 50) {
      return {
        emptyMessage: false,
        messageIsTooLong: {
          maxLength: 50,
        },
      };
    }

    return true;
  }

  @mobx.action
  send(text: string): void {
    if (this.canSend(text) !== true) {
      throw new Error("send cannot be called if canSend is not true.");
    }

    this._messages.push({
      id: Date.now().toString(),
      date: new Date(),
      text: text,
      senderId: this.auth.currentUser.id,
    });
  }

  @mobx.computed
  canDelete(message: ChatMessage): MobxObservable<boolean> {
    if (this._messages.indexOf(message) === -1) {
      throw new Error("message was not found in internal collection");
    }

    return message.senderId === this.auth.currentUser.id;
  }

  @mobx.action
  delete(message: ChatMessage): void {
    if (this.canDelete(message) !== true) {
      throw new Error("delete cannot be called if canDelete is not true.");
    }

    const index = this._messages.indexOf(message);

    this._messages.splice(index, 1);
  }

  @mobx.action
  addMessage(text: string, senderId: string): void {
    this._messages.push({
      id: Date.now().toString(),
      text: text,
      date: new Date(),
      senderId: senderId,
    });
  }
}

export default Chat;
