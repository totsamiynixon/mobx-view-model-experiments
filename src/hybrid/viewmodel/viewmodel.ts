import * as mobx from "mobx";

class ChatViewModel {
  @mobx.observable
  public selectedItemId: string | null = null;

  constructor() {
    mobx.makeAutoObservable(this);
  }
}

export default ChatViewModel;

export const viewModel = new ChatViewModel();
