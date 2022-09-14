import { Welcome } from "./fakeProducts";
import TableLayout from "../templates/tableLayout";

import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { sortColumn } from "../pages/Products/index";

interface Props {
  products: Welcome[];
  onDelete: (product: Welcome) => void;
  sortColumn: sortColumn;
  onSort: (sortColumn: sortColumn) => void;
}

interface column {
  label?: string;
  path?: string;
  key: string;
  content?: (column: Welcome) => void;
}

export default function ProductTable({
  products,
  onDelete,
  sortColumn,
  onSort,
}: Props) {
  const columns: column[] = [
    {
      label: "Title",
      path: "title",
      key: "",
      content: (column: Welcome) => {
        return (
          <Link href={`Products/ProductForm/${column.id}`}>
            <a>{column.title}</a>
          </Link>
        );
      },
    },
    {
      label: "Category",
      path: "category.name",
      key: "",
    },
    {
      label: "Rating",
      path: "rating.rate",
      key: "",
    },
    {
      label: "Price",
      path: "price",
      key: "",
    },
    {
      key: "View",
      content: (column: Welcome) => {
        return (
          <Link href={`Products/${column.id}`}>
            <a>
              <Button id={"" + column.id} colorScheme="yellow" size="sm">
                View
              </Button>
            </a>
          </Link>
        );
      },
    },
    {
      key: "Delete",
      content: (column: Welcome) => {
        return (
          <Button
            id={"" + column.id}
            colorScheme="red"
            size="sm"
            onClick={() => onDelete(column)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    // shorthand using the `Grid` component
    <TableLayout
      data={products}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}
