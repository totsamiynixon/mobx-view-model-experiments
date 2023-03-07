import { Box, Divider } from "@chakra-ui/react";
import React from "react";
import Common from "../common";
import Form from "./containers/form";
import Messages from "./containers/messages";
import Toolbar from "./containers/toolbar";

const App: React.FC = () => {
  return (
    <Box>
      <Toolbar />
      <Messages />
      <Form />
    </Box>
  );
};

export default App;
