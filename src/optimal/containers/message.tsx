import React from "react";
import * as mobx from "mobx-react";
import { computed } from "mobx";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { ChatMessageViewModel, viewModel } from "..//viewmodel/viewmodel";

interface MessageProps {
  message: ChatMessageViewModel;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  // minimize rerendering of component by computing property outside of react scope
  // compromise made to keep selectedItem on viewModel level
  const isSelected = computed(() => viewModel.selectedItem === message).get();

  if (message.isOwn) {
    return (
      <Flex
        w="100%"
        justify="flex-end"
        bg={isSelected ? "red" : undefined}
        onDoubleClick={() =>
          !isSelected
            ? viewModel.selectItem(message)
            : viewModel.selectItem(null)
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
          name={message.name}
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
