import React from "react";
import * as mobx from "mobx-react";
import { Button, Flex } from "@chakra-ui/react";
import { viewModel } from "..//viewmodel/viewmodel";

const Toolbar: React.FC = () => {
  if (!viewModel.selectedItem) {
    return null;
  }

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
        disabled={viewModel.canDeleteSelected}
        onClick={() => viewModel.deleteSelected()}
      >
        Delete selected
      </Button>
    </Flex>
  );
};

export default mobx.observer(Toolbar);
