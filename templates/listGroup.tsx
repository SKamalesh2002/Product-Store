import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";

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
  return (
    <Box
      w="max-content"
      mt="1rem"
      borderRight="1px"
      borderLeft="1px"
      borderTop="1px"
      borderColor="gray.400"
      borderBottomRadius="md"
    >
      {categories.map((category) => (
        <Flex
          key={category.id}
          p="2"
          borderBottom="1px"
          borderBottomColor="gray.400"
          borderBottomRadius="md"
          cursor="pointer"
          role="group"
          className="list-group-item"
          onClick={() => onItemSelect(category)}
          _hover={{ bg: "gray.100" }}
        >
          {category.name}
        </Flex>
      ))}
    </Box>
  );
};

export default ListGroup;
