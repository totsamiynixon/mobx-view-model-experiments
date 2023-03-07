import React from "react";
import * as mobx from "mobx-react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { ChatMessageViewModel, viewModel } from "..//viewmodel/viewmodel";

interface MessageProps {
  messageVM: ChatMessageViewModel;
}

const Message: React.FC<MessageProps> = ({ messageVM }) => {
  if (messageVM.isOwn) {
    return (
      <Flex
        w="100%"
        justify="flex-end"
        bg={messageVM.isSelected ? "red" : undefined}
        onClick={() =>
          messageVM.isSelected
            ? viewModel.selectItem(null)
            : viewModel.selectItem(messageVM)
        }
      >
        <Flex bg="black" color="white" minW="100px" maxW="350px" my="1" p="3">
          <Text>{messageVM.text}</Text>
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Flex w="100%">
        <Avatar
          name={messageVM.name}
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
          <Text>{messageVM.text}</Text>
        </Flex>
      </Flex>
    );
  }
};

export default mobx.observer(Message);
