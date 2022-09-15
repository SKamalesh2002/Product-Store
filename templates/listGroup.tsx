import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { useRouter } from "next/router";

interface category {
  id: number | null;
  name: string;
}
interface Props {
  categories: category[];
  onItemSelect: (category: category) => void;
  selectedItem: category;
}

const ListGroup: FC<Props> = ({ categories, onItemSelect, selectedItem }) => {
  const router = useRouter();
  const handleClick = (category: category): void => {
    onItemSelect(category);
  };
  return (
    <Box
      background="white"
      w="max-content"
      mt="1rem"
      rounded="md"
      border="1px"
      borderColor="gray.100"
    >
      {categories.map((category) => (
        <Flex
          key={category.id}
          p="2"
          borderBottom="1px"
          borderBottomColor="gray.100"
          cursor="pointer"
          role="group"
          className="list-group-item"
          onClick={() => handleClick(category)}
          _hover={{ bg: "gray.200" }}
        >
          {category.name}
        </Flex>
      ))}
    </Box>
  );
};

export default ListGroup;
