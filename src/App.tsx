import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Divider,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import ChatOptimal from "./optimal/app";
import ChatOptimalV2 from "./optimalv2/app";
import ChatNonOptimal from "./unoptiomal/app";
import ChatHybrid from "./hybrid/app";
import Common from "./common";

export const App = () => (
  <ChakraProvider theme={theme}>
    {/* <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
        </VStack>
      </Grid>
    </Box> */}
    <Box
      w={"100%"}
      display={"flex"}
      flexFlow={"row wrap"}
      alignItems={"center"}
    >
      <Box w={"100%"}>
        <Common />
      </Box>

      <Divider h={50} />
{/* 
      <Box w={600} display={"flex"} flexFlow={"column"}>
        <ChatOptimal />
      </Box> */}

      <Box w={600} display={"flex"} flexFlow={"column"}>
        <ChatOptimalV2 />
      </Box>

      <Divider w={50} />

      <Box w={600} display={"flex"} flexFlow={"column"}>
        <ChatNonOptimal />
      </Box>
    </Box>
  </ChakraProvider>
);
