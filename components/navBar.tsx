import { FC } from "react";

import { Box, Flex, Heading, Spacer, Text, HStack } from "@chakra-ui/react";
import Link from "next/link";

interface Props {}

const NavBar: FC<Props> = () => {
  return (
    <Box bg="white" rounded="md" p="5">
      <Flex>
        <Heading>Product Store</Heading>
        <Spacer />
        <HStack pr="10">
          <Link href="Products/loginForm">
            <a>
              <Text alignItems="flex-end">Login</Text>
            </a>
          </Link>
          <Link href="Products/registerForm">
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
