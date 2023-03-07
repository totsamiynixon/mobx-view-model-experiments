import * as mobx from "mobx";
import { auth, chat, users } from "../../models";
import Auth, { AuthUser } from "../../models/auth";
import Chat, { ChatMessage } from "../../models/chat";
import Users, { User } from "../../models/users";

class ChatViewModel {
  @mobx.observable
  private _selectedItem: ChatMessageViewModel | null = null;

  @mobx.observable
  private _itemsIndex: Array<
    [ChatMessage, User | AuthUser, ChatMessageViewModel]
  > = [];

  constructor(private chat: Chat, private users: Users, private auth: Auth) {
    mobx.makeAutoObservable(this);

    // move to init lyfecycle method
    // rest on destroy lifecycle method
    mobx.observe(
      chat.messages,
      () => {
        const changes = chat.messages;
        const newMessages = changes.filter(
          (x) => !this._itemsIndex.find((i) => i[0] === x)
        );

        const toRemoveFromIndex = this._itemsIndex.filter(
          (i) => !changes.find((c) => c === i[0])
        );

        mobx.runInAction(() => {
          toRemoveFromIndex.forEach((x) => {
            this._itemsIndex.splice(this._itemsIndex.indexOf(x), 1);
          });

          newMessages.forEach((nm) => {
            const user =
              nm.senderId === this.auth.currentUser.id
                ? this.auth.currentUser
                : this.users.users.find((u) => u.id === nm.senderId);

            if (user) {
              this._itemsIndex.push([
                nm,
                user,
                new ChatMessageViewModel(nm, user, this.auth),
              ]);
            }
          });
        });
      },
      true
    );

    mobx.observe(
      users.users,
      () => {
        const changes = users.users;

        const toRemoveFromIndex = this._itemsIndex.filter(
          (i) =>
            i[1] !== this.auth.currentUser && !changes.find((c) => c === i[1])
        );

        mobx.runInAction(() => {
          toRemoveFromIndex.forEach((x) => {
            this._itemsIndex.splice(this._itemsIndex.indexOf(x), 1);
          });
        });
      },
      true
    );
    // mobx.autorun(() => {
    //   this._items = new Map(
    //     this.chat.messages
    //       .map((x) => ({
    //         message: x,
    //         user:
    //           x.senderId === this.auth.currentUser.id
    //             ? this.auth.currentUser
    //             : this.users.users.find((u) => u.id === x.senderId),
    //       }))
    //       .filter((x) => x.user)
    //       .map(
    //         (x) =>
    //           [
    //             new ChatMessageViewModel(x.message, x.user!, this.auth, false),
    //             x.message,
    //           ] as const
    //       )
    //   );
    // });
  }

  @mobx.computed
  get items(): readonly ChatMessageViewModel[] {
    const result = this._itemsIndex
      .filter((x) => x[2] !== null)
      .map((x) => x[2]!);

    return result;
  }

  @mobx.computed
  get selectedItem(): ChatMessageViewModel | null {
    return this._selectedItem;
  }

  @mobx.action
  selectItem(item: ChatMessageViewModel | null): void {
    if (item) {
      const message = this._itemsIndex.find((x) => x[2] === item);

      if (!message) {
        throw new Error("view model is not associated to any message");
      }
    }

    mobx.runInAction(() => {
      this._selectedItem = item;
    });
  }

  get canDeleteSelected(): boolean {
    if (!this._selectedItem) {
      return false;
    }

    const [message] = this._itemsIndex.find(
      (x) => x[2] === this._selectedItem
    )!;

    return this.chat.canDelete(message!);
  }

  @mobx.action
  deleteSelected(): void {
    if (!this.canDeleteSelected) {
      throw new Error(
        "delete selected should never be called if canDeleteSelected is false"
      );
    }

    const [message] = this._itemsIndex.find(
      (x) => x[2] === this._selectedItem
    )!;

    this.chat.delete(message!);
    this.selectItem(null);
  }

  @mobx.observable
  public currentMessage: string = "";

  @mobx.computed
  get canSendMessage(): boolean {
    return this.chat.canSend(this.currentMessage) === true;
  }

  @mobx.action
  sendMessage(): void {
    this.chat.send(this.currentMessage);
  }
}

class ChatMessageViewModel {
  constructor(
    public message: ChatMessage,
    public user: User | AuthUser,
    private auth: Auth
  ) {
    mobx.makeAutoObservable(this);
  }

  @mobx.computed
  get id(): string {
    return this.message.id;
  }

  @mobx.computed
  get name(): string {
    return (this.user as AuthUser).displayName || (this.user as User).name;
  }

  @mobx.computed
  get text(): string {
    return this.message.text;
  }

  @mobx.computed
  get isOwn(): boolean {
    return this.user === this.auth.currentUser;
  }
}

export { ChatViewModel, ChatMessageViewModel };

export const viewModel = new ChatViewModel(chat, users, auth);
