import React from "react";
import * as mobx from "mobx-react";
import { viewModel } from "../viewmodel/viewmodel";
import { Button, Flex } from "@chakra-ui/react";
import { chat } from "../../models";

const Toolbar: React.FC = () => {
  if (!viewModel.selectedItemId) {
    return null;
  }

  const message = chat.messages.find((x) => x.id === viewModel.selectedItemId);

  if (!message) {
    throw new Error();
  }

  const deleteMessage = () => {
    chat.delete(message);
    viewModel.selectedItemId = null;
  };

  return (
    <Flex>
      <Button
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        disabled={chat.canDelete(message)}
        onClick={() => deleteMessage()}
      >
        Delete selected
      </Button>
    </Flex>
  );
};

export default mobx.observer(Toolbar);
