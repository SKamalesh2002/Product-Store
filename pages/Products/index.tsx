import * as product from "../../components/fakeProducts";

import { Welcome, category } from "../../components/fakeProducts";

import ProductTable from "../../components/productTable";
import { useState, FC } from "react";
import Link from "next/link";
import _ from "lodash";
import { Text, Grid, GridItem, Button, Flex } from "@chakra-ui/react";
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

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const getPageData = (): { totalCount: number; data: Welcome[] } => {
    const filtered = currentCategory.id
      ? products.filter((p) => p.category.id === currentCategory.id)
      : products;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const pageProducts = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: pageProducts };
  };

  const { totalCount, data: pageProducts } = getPageData();

  return (
    <Grid
      templateAreas={`
      "header"
      "body"`}
    >
      <GridItem area="header">
        <NavBar />
      </GridItem>

      <GridItem area="body" background="white">
        <Grid
          templateAreas={`
            "nav main"
            "nav footer"`}
        >
          <GridItem area="nav" pl="10" pt="10">
            <ListGroup
              categories={categories}
              onItemSelect={handleCategorySelect}
              selectedItem={currentCategory}
            />
          </GridItem>

          <GridItem area="main" p="5">
            <Flex>
              <Link href="../Products/newProductForm">
                <a href="">
                  <Button size="sm" colorScheme="messenger">
                    New Product
                  </Button>
                </a>
              </Link>
              <Text p="3">{`Currently Showing ${totalCount} products`}</Text>
            </Flex>

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
  );
};

export default Products;
