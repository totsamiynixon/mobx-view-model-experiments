import { Box } from "@chakra-ui/react";
import React from "react";
import Form from "./containers/form";
import Messages from "./containers/messages";
import Toolbar from "./containers/toolbar";
import { ChatViewModelProvider } from "./contexts/viewModelContext";

const App: React.FC = () => {
  return (
    <ChatViewModelProvider>
      <Box>
        <Toolbar />
        <Messages />
        <Form />
      </Box>
    </ChatViewModelProvider>
  );
};

export default App;
