import React, { useEffect } from "react";
import * as mobx from "mobx-react";
import { computed } from "mobx";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { ChatMessage } from "../../models/chat";
import { User } from "../../models/users";
import { auth, users } from "../../models";
import { viewModel } from "../viewmodel/viewmodel";

interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const user = computed(() => {
    console.log("user");
    return message.senderId === auth.currentUser.id
      ? auth.currentUser
      : users.users.find((x) => x.id === message.senderId) || null;
  }).get();

  const isSelected = computed(() => {
    console.log("isSelected");
    return viewModel.selectedItemId === message.id;
  }).get();

  useEffect(() => {
    return () => {
      if (viewModel.selectedItemId === message.id) {
        viewModel.selectedItemId = null;
      }
    };
  }, []);

  if (user === auth.currentUser) {
    return (
      <Flex
        w="100%"
        justify="flex-end"
        bg={isSelected ? "red" : undefined}
        onClick={() =>
          viewModel.selectedItemId !== message.id
            ? (viewModel.selectedItemId = message.id)
            : (viewModel.selectedItemId = null)
        }
      >
        <Flex bg="black" color="white" minW="100px" maxW="350px" my="1" p="3">
          <Text>{message.text}</Text>
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Flex w="100%">
        <Avatar
          name={(user as User)?.name}
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
          <Text>{message.text}</Text>
        </Flex>
      </Flex>
    );
  }
};

export default mobx.observer(Message);
