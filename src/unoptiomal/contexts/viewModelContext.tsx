import { createContext, ReactNode, useContext, useEffect } from "react";
import { chat } from "../../models";
import ChatViewModel from "../viewmodel/viewmodel";

type Props = {
  children: ReactNode;
};

const ChatViewModelContext = createContext<ChatViewModel | null>(null);

export const ChatViewModelProvider: React.FC<Props> = ({ children }) => {
  const viewModel = new ChatViewModel(chat);

  useEffect(() => {
    viewModel.init();

    return () => {
      viewModel.destroy();
    };
  });

  return (
    <ChatViewModelContext.Provider value={viewModel}>
      {children}
    </ChatViewModelContext.Provider>
  );
};

export const useChatViewModel = () => {
  const value = useContext(ChatViewModelContext);

  if (!value) {
    throw new Error();
  }

  return value;
};
