import React from "react";
import * as mobx from "mobx-react";
import { Flex } from "@chakra-ui/react";
import { chat, users } from "../../models";
import Message from "./message";
import { shallowCompareArrays, useComputedMemo } from "../utils";

const useMessagesViewModel = () => {
  const messages = useComputedMemo(
    () => {
      return chat.messages.filter(
        (x) => !users.users.find((u) => u.id === x.senderId)
      );
    },
    [],
    {
      equals: shallowCompareArrays,
    }
  );

  return {
    messages,
  };
};

const Messages: React.FC = mobx.observer(() => {
  const { messages } = useMessagesViewModel();

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </Flex>
  );
});

export default Messages;
