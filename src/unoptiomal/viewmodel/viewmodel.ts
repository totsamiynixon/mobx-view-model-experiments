import * as mobx from "mobx";
import Chat from "../../models/chat";

class ChatViewModel {
  private _disposer: mobx.IReactionDisposer | null;

  @mobx.observable
  public selectedItemId: string | null = null;

  constructor(private chat: Chat) {
    this._disposer = null;
    mobx.makeAutoObservable(this);
  }

  init(): void {
    this._disposer = mobx.autorun(() => {
      if (!this.selectedItemId) {
        return;
      }

      const selectedMessage = this.chat.messages.find(
        (x) => x.id === this.selectedItemId
      );

      if (!selectedMessage) {
        mobx.runInAction(() => {
          this.selectedItemId = null;
        });
      }
    });
  }

  destroy(): void {
    this._disposer?.();
    this._disposer = null;
  }
}

export default ChatViewModel;
