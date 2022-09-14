import { Welcome } from "../components/fakeProducts";
import { Table, TableContainer } from "@chakra-ui/react";

import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import { sortColumn } from "../pages/Products/index";

interface column {
  path?: string;
  key: string;
  label?: string;
  content?: (column: Welcome) => void;
}

interface Props {
  data: Welcome[];
  columns: column[];
  sortColumn: sortColumn;
  onSort: (sortColumn: sortColumn) => void;
}

function TableLayout({ columns, data, sortColumn, onSort }: Props) {
  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={data} columns={columns} />
      </Table>
    </TableContainer>
  );
}

export default TableLayout;
