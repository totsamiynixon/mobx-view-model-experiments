import React, { useState } from "react";
import * as mobx from "mobx-react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { chat } from "../../models";

const Form: React.FC = () => {
  const [currentInput, setCurrentInput] = useState("");

  return (
    <Flex w="100%" mt="5">
      <Input
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        _focus={{
          border: "1px solid black",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter" && chat.canSend(currentInput) === true) {
            chat.send(currentInput);
          }
        }}
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
      />
      <Button
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        disabled={chat.canSend(currentInput) !== true}
        onClick={() => chat.send(currentInput)}
      >
        Send
      </Button>
    </Flex>
  );
};

export default mobx.observer(Form);
