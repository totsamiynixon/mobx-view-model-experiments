import React, { useEffect } from "react";
import * as mobx from "mobx-react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { ChatMessage } from "../../models/chat";
import { User } from "../../models/users";
import { auth, users } from "../../models";
import { AuthUser } from "../../models/auth";
import { useComputedMemo } from "../utils";
import { useChatViewModel } from "../contexts/viewModelContext";

interface MessageProps {
  message: ChatMessage;
}

const useMessageViewModel = (message: ChatMessage) => {
  const viewModel = useChatViewModel();

  const user = useComputedMemo(
    () =>
      message.senderId === auth.currentUser.id
        ? auth.currentUser
        : users.users.find((x) => x.id === message.senderId) || null,
    [message]
    // need deps because if message change need to recreate computed function,
    // others deps are just imported
    // but if they are injected using context then also should be passed as dependencies
  );

  const isSelected = useComputedMemo(
    () => viewModel.selectedItemId === message.id,
    [viewModel]
  );

  return {
    senderName:
      (user as User)?.name || (user as AuthUser)?.displayName || "Unknown",
    text: message.text,
    isCurrentUserMessage: user === auth.currentUser,
    isSelected: isSelected,
    toggleSelect: () =>
      viewModel.selectedItemId !== message.id
        ? (viewModel.selectedItemId = message.id)
        : (viewModel.selectedItemId = null),
  };
};

const Message: React.FC<MessageProps> = mobx.observer(({ message }) => {
  const { isCurrentUserMessage, isSelected, senderName, text, toggleSelect } =
    useMessageViewModel(message);

  if (isCurrentUserMessage) {
    return (
      <Flex
        w="100%"
        justify="flex-end"
        bg={isSelected ? "red" : undefined}
        onClick={toggleSelect}
      >
        <Flex bg="black" color="white" minW="100px" maxW="350px" my="1" p="3">
          <Text>{text}</Text>
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Flex w="100%">
        <Avatar
          name={senderName}
          src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
          bg="blue.300"
        ></Avatar>
        <Flex
          bg="gray.100"
          color="black"
          minW="100px"
          maxW="350px"
          my="1"
          p="3"
        >
          <Text>{text}</Text>
        </Flex>
      </Flex>
    );
  }
});

export default Message;
