import { FC } from "react";

import { Box, Flex, Heading, Spacer, Text, HStack } from "@chakra-ui/react";
import Link from "next/link";

interface Props {}

const NavBar: FC<Props> = () => {
  return (
    <Box bg="black" textColor="white" p="5">
      <Flex>
        <Link href="/">
          <a>
            <Heading>Product Store</Heading>
          </a>
        </Link>

        <Spacer />
        <HStack pr="10">
          <Link href="../Products/loginForm">
            <a>
              <Text>Login</Text>
            </a>
          </Link>
          <Link href="../Products/registerForm">
            <a>
              <Text>Register</Text>
            </a>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;
