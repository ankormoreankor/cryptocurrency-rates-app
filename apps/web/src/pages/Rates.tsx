import { observer } from 'mobx-react-lite';
import { ReactNode, useEffect } from 'react';
import { ratesStore } from '../../../../shared/stores/RatesStore';

import { Column, ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@components/DataTable';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@components/button';
import { CoinRateDetail, CurrencyCode, currencyCodes } from '../../../../shared/types';
import { Input } from '@components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/select';

type ColumnKeys = keyof CoinRateDetail;

type TableData = { [key in ColumnKeys]: ReactNode };

const ColumnHeader = ({ column, title }: { column: Column<TableData, unknown>; title: string }) => {
  return (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const columns: ColumnDef<TableData>[] = [
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
      {!ratesStore.isLoading && ratesStore.filteredCoins !== undefined && (
        <>
          <header>
            <h1>Cryptocurrency rates</h1>

            <div className="flex justify-between gap-4">
              <Input className="max-w-[50%]" onChange={(e) => ratesStore.setSearchQuery(e.target.value)} />

              <Select onValueChange={(value) => ratesStore.setSelectedCurrency(value as CurrencyCode)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={ratesStore.selectedCurrency} />
                </SelectTrigger>
                <SelectContent>
                  {currencyCodes.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </header>

          <div className="container mx-auto py-10">
            <DataTable
              columns={columns}
              data={ratesStore.filteredCoins.map((coin) => ({
                coinName: <span className=" p-4">{coin.coinName}</span>,
                currencyCode: <span className=" p-4">{coin.currencyCode}</span>,
                rate: <span className=" p-4">{coin.rate}</span>,
                ask: <span className=" p-4">{coin.ask}</span>,
                bid: <span className=" p-4">{coin.bid}</span>,
                diff24h: <span className=" p-4">{coin.diff24h}</span>,
              }))}
              tableHeight={400}
            />
          </div>
        </>
      )}
    </>
  );
});
