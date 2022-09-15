import { Thead, Tr, Th } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { sortColumn } from "../pages/Products/index";

interface tableHeaderProps {
  columns: column[];
  sortColumn: sortColumn;
  onSort: (sortColumn: sortColumn) => void;
}

interface column {
  label?: string;
  path?: string;
  key: string;
}

function TableHeader({ columns, sortColumn, onSort }: tableHeaderProps) {
  const raiseSort = (path: string) => {
    const sortColumnClone = { ...sortColumn };

    if (sortColumnClone.path === path)
      sortColumnClone.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumnClone.path = path;
      sortColumnClone.order = "asc";
    }

    onSort(sortColumnClone);
  };
  const renderSortIcon = (column: column) => {
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === "asc") return <ArrowUpIcon fontSize="md" pb="1" />;
    else return <ArrowDownIcon fontSize="md" pb="1" />;
  };
  return (
    <Thead>
      <Tr>
        {columns.map((column: column) => (
          <Th
            key={column.path || column.key}
            fontSize="sm"
            pt="5"
            cursor="pointer"
            onClick={() => {
              if (column.path) raiseSort(column.path);
            }}
          >
            {column.label} {renderSortIcon(column)}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
}

export default TableHeader;
