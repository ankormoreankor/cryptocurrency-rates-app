import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ratesStore } from '../../../../shared/stores/RatesStore';

import { Column, ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@components/DataTable';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@components/button';
import { CurrentCoinRate } from '../../../../shared/types';
import { Input } from '@components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/select';

const ColumnHeader = ({ column, title }: { column: Column<CurrentCoinRate, unknown>; title: string }) => {
  return (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const columns: ColumnDef<CurrentCoinRate>[] = [
  {
    accessorKey: 'coinName',
    header: ({ column }) => <ColumnHeader column={column} title="Coin Name" />,
  },
  {
    accessorKey: 'currencyCode',
    header: 'Currency',
  },
  {
    accessorKey: 'ask',
    header: ({ column }) => <ColumnHeader column={column} title="Ask" />,
  },
  {
    accessorKey: 'bid',
    header: ({ column }) => <ColumnHeader column={column} title="Bid" />,
  },
  {
    accessorKey: 'rate',
    header: ({ column }) => <ColumnHeader column={column} title="Rate" />,
  },
  {
    accessorKey: 'diff24h',
    header: ({ column }) => <ColumnHeader column={column} title="Diff 24h" />,
  },
];

export const Rates = observer(() => {
  useEffect(() => {
    ratesStore.fetchCoins();
  }, []);

  return (
    <>
      {ratesStore.isLoading && <p>Loading...</p>}
      {!ratesStore.isLoading && ratesStore.coinRates !== undefined && (
        <>
          <header>
            <h1>Cryptocurrency rates</h1>

            <div className="flex justify-between gap-4">
              <Input className="max-w-[50%]" />

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </header>

          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={ratesStore.coinRates} tableHeight={400} />
          </div>
        </>
      )}
    </>
  );
});
