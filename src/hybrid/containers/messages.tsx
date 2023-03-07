import React, { useEffect, useRef } from "react";
import * as mobx from "mobx-react";
import { computed } from "mobx";
import { Flex } from "@chakra-ui/react";
import { auth, chat, users } from "../../models";
import Message from "./message";

const Messages: React.FC = () => {
  const messages = computed(() => {
    console.log("messages");

    return chat.messages
      .map((x) => ({
        message: x,
        user:
          x.senderId === auth.currentUser.id
            ? auth.currentUser
            : users.users.find((u) => u.id === x.senderId),
      }))
      .filter((x) => x.user);
  }).get();

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map(({ message }) => (
        <Message message={message} key={message.id} />
      ))}
    </Flex>
  );
};

export default mobx.observer(Messages);
