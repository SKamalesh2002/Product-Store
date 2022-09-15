import * as product from "../../components/fakeProducts";

import { Welcome, category } from "../../components/fakeProducts";

import ProductTable from "../../components/productTable";
import { useState, FC } from "react";
import Link from "next/link";
import _ from "lodash";
import {
  Text,
  Grid,
  GridItem,
  Button,
  Flex,
  Box,
  Input,
} from "@chakra-ui/react";
import ListGroup from "../../templates/listGroup";
import Pagination from "../../templates/pagination";
import { paginate } from "../../utils/paginate";
import NavBar from "../../components/navBar";

interface Props {}

export interface sortColumn {
  path: string;
  order: boolean | "asc" | "desc";
}

const Products: FC<Props> = () => {
  const [products, setProducts] = useState<Welcome[]>(product.getProducts());
  const [categories] = useState<category[]>([
    { id: null, name: "All category" },
    ...product.getCateories(),
  ]);
  const [currentCategory, setCurrentCategory] = useState<category>({
    id: null,
    name: "All category",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(8);
  const [sortColumn, setSortColumn] = useState<sortColumn>({
    path: "title",
    order: "asc",
  });
  const [search, setSearch] = useState<string>("");

  const handleCategorySelect = (category: category): void => {
    setCurrentCategory(category);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn: sortColumn) => {
    setSortColumn(sortColumn);
  };
  const handleDelete = (product: Welcome): void => {
    setProducts(products.filter((p) => p.id !== product.id));
  };

  const searchData = (search: string) => {
    return products.filter((m) =>
      m.title.toLowerCase().startsWith(search.toLowerCase())
    );
  };

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const handleType = (search: string) => {
    setCurrentPage(1);
    setSearch(search);
    setCurrentCategory({ id: null, name: "All Category" });
  };

  const getPageData = (): { totalCount: number; data: Welcome[] } => {
    const filtered = search
      ? searchData(search)
      : currentCategory && currentCategory.id
      ? products.filter((p) => p.category.id === currentCategory.id)
      : products;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const pageProducts = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: pageProducts };
  };

  const { totalCount, data: pageProducts } = getPageData();

  return (
    <Flex h="vh" w="vh" background="gray.100">
      <Grid
        background="gray.100"
        templateAreas={`
        "header"
        "body"`}
      >
        <GridItem area="header" w="180vh">
          <NavBar />
        </GridItem>
        <GridItem
          position="absolute"
          area="body"
          background="gray.100"
          pl="10"
          mt="100"
        >
          <Grid
            templateAreas={`
              "nav main"
              "nav footer"`}
          >
            <GridItem area="nav">
              <ListGroup
                categories={categories}
                onItemSelect={handleCategorySelect}
                selectedItem={currentCategory}
              />
            </GridItem>
            <GridItem area="main" p="5">
              <Box>
                <Link href="../Products/newProductForm">
                  <a href="">
                    <Button size="sm" colorScheme="messenger">
                      New Product
                    </Button>
                  </a>
                </Link>
                <Text p="3">{`Currently Showing ${totalCount} products`}</Text>
              </Box>
              <Input
                placeholder="Search Title..."
                background="white"
                mb="4"
                value={search}
                onChange={(ev) => handleType(ev.target.value)}
              />
              <ProductTable
                products={pageProducts}
                onDelete={handleDelete}
                sortColumn={sortColumn}
                onSort={handleSort}
              />
            </GridItem>
            <GridItem area="footer">
              <Pagination
                itemCount={totalCount}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              ></Pagination>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Products;
