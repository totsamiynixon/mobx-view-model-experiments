import React, {  } from "react";
import * as mobx from "mobx-react";
import { Flex } from "@chakra-ui/react";
import Message from "./message";
import { viewModel } from "../viewmodel/viewmodel";

const Messages: React.FC = () => {
  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {viewModel.items.map((messageVM) => (
        <Message messageVM={messageVM} key={messageVM.id} />
      ))}
    </Flex>
  );
};

export default mobx.observer(Messages);
