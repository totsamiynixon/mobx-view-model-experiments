import React, { useState } from "react";
import * as mobx from "mobx-react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { viewModel } from "../viewmodel/viewmodel";

const Form: React.FC = () => {
  return (
    <Flex w="100%" mt="5">
      <Input
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        _focus={{
          border: "1px solid black",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter" && viewModel.canSendMessage) {
            viewModel.sendMessage();
          }
        }}
        value={viewModel.currentMessage}
        onChange={(e) => (viewModel.currentMessage = e.target.value)}
      />
      <Button
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        disabled={!viewModel.canSendMessage}
        onClick={() => viewModel.sendMessage()}
      >
        Send
      </Button>
    </Flex>
  );
};

export default mobx.observer(Form);
