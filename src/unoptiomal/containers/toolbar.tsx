import React from "react";
import * as mobx from "mobx-react";
import { Button, Flex } from "@chakra-ui/react";
import { chat } from "../../models";
import { useChatViewModel } from "../contexts/viewModelContext";
import { useComputedMemo } from "../utils";

const useToolbarViewModel = () => {
  const viewModel = useChatViewModel();

  const selectedMessage = useComputedMemo(
    () =>
      viewModel.selectedItemId
        ? chat.messages.find((x) => x.id === viewModel.selectedItemId) || null
        : null,
    [viewModel]
  );

  const canDeleteSelected = useComputedMemo(
    () => (selectedMessage ? chat.canDelete(selectedMessage) : false),
    [selectedMessage]
  );

  if (!selectedMessage) {
    return null;
  }

  return {
    selectedMessageText: selectedMessage.text,
    canDeleteSelected,
    deleteSelected: () => {
      chat.delete(selectedMessage);
    },
  };
};

const Toolbar: React.FC = mobx.observer(() => {
  const vm = useToolbarViewModel();

  if (!vm) {
    return null;
  }

  const { selectedMessageText, canDeleteSelected, deleteSelected } = vm;

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
        disabled={canDeleteSelected}
        onClick={deleteSelected}
      >
        Delete <i>{selectedMessageText}</i>
      </Button>
    </Flex>
  );
});

export default Toolbar;
