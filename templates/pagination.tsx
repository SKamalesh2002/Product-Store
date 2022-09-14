import { FC } from "react";
import _ from "lodash";
import { Box, Flex } from "@chakra-ui/react";

interface Props {
  itemCount: number;
  pageSize: number;
  onPageChange: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: FC<Props> = ({
  itemCount,
  pageSize,
  onPageChange,
  currentPage,
}) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;

  const pages: number[] = _.range(1, pageCount + 1);
  return (
    <Flex
      w="max-content"
      m="1rem"
      borderLeft="1px"
      borderTop="1px"
      borderBottom="1px"
      borderColor="gray.400"
      borderRadius="sm"
    >
      {pages.map((pageNumber) => (
        <Box
          key={pageNumber}
          borderRight="1px"
          borderColor="gray.400"
          _hover={{ bg: "gray.100" }}
          cursor="pointer"
          pl="2"
          pr="2"
          pt="1"
          pb="1"
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Box>
      ))}
    </Flex>
  );
};

export default Pagination;
