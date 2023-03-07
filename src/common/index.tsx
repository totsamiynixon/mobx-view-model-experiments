import React, { useState } from "react";
import * as mobx from "mobx-react";
import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";
import { chat, users } from "../models";

const Common: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>();
  const [text, setText] = useState<string>();

  return (
    <Flex flexFlow={"row"}>
      <Button
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        onClick={() => users.addNextUser()}
      >
        Add user
      </Button>

      <Flex w={300} bg={"yellow"}>
        <Select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          {users.users.map((x) => (
            <option value={x.id}>{x.name}</option>
          ))}
        </Select>
        <Button
          bg="black"
          color="white"
          borderRadius="none"
          _hover={{
            bg: "white",
            color: "black",
            border: "1px solid black",
          }}
          onClick={() =>
            users.deleteUser(users.users.find((x) => x.id === selectedUser)!)
          }
        >
          Delete user
        </Button>
      </Flex>
      <Flex w={300} bg={"yellow"}>
        <Input
          placeholder="Type Something..."
          border="none"
          borderRadius="none"
          _focus={{
            border: "1px solid black",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
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
          onClick={() => chat.addMessage(text!, selectedUser!)}
        >
          Add message
        </Button>
      </Flex>
    </Flex>
  );
};

export default mobx.observer(Common);
