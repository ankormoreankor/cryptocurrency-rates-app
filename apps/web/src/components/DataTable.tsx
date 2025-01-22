import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@components/table';
import { isValidElement, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableHeight: number | string;
}

export const DataTable = <TData, TValue>({ columns, data, tableHeight }: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  const { rows } = table.getRowModel();

  return (
    <div className="rounded-md border">
      <TableVirtuoso
        style={{ height: tableHeight }}
        totalCount={rows.length}
        components={{
          Table: Table,
          TableBody: TableBody,
          TableRow: TableRow,
          TableHead: TableHeader,
          TableFoot: TableFooter,
        }}
        fixedHeaderContent={() => {
          return table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ));
        }}
        itemContent={(index) => {
          const row = rows[index];

          if (!row) return null;

          return row.getVisibleCells().map((cell) => {
            const sellContent = cell.renderValue();
            const isValidReactNode = isValidElement(sellContent) || typeof sellContent === 'string';

            if (!isValidReactNode) return false;

            return <TableCell key={cell.id}>{sellContent}</TableCell>;
          });
        }}
      />
    </div>
  );
};
