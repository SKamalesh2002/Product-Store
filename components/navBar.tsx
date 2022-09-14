import { FC } from "react";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

interface Props {}

const NavBar: FC<Props> = () => {
  return (
    <Box bg="gray.100">
      <Flex>
        <Heading>Product Store</Heading>
        <Link href="Products/loginForm">
          <a>
            <Text>Login</Text>
          </a>
        </Link>

        <Link href="Products/registerForm">
          <a>
            <Text>Register</Text>
          </a>
        </Link>
      </Flex>
    </Box>
  );
};

export default NavBar;
