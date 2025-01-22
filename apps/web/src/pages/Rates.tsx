import { observer } from 'mobx-react-lite';
import { ReactNode, useEffect } from 'react';
import { ratesStore } from '../../../../shared/stores/RatesStore';

import { Column, ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@components/DataTable';
import { ArrowUpDown, MoveDown, MoveUp } from 'lucide-react';
import { Button } from '@components/button';
import { CoinRateDetail, CurrencyCode, currencyCodes } from '../../../../shared/types';
import { Input } from '@components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/select';
import { NavLink } from 'react-router';
import { Diff } from '@components/Diff';
import { CellNumberContent } from '@components/table';

type ColumnKeys = keyof CoinRateDetail;

type TableData = { [key in ColumnKeys]: ReactNode };

const ColumnHeader = ({ column, title }: { column: Column<TableData, unknown>; title: string }) => {
  return (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {title}
      {column.getIsSorted() === 'asc' && <MoveUp className="ml-2 h-4 w-4" />}
      {column.getIsSorted() === 'desc' && <MoveDown className="ml-2 h-4 w-4" />}
      {!column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
    </Button>
  );
};

export const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'coinName',
    header: ({ column }) => <ColumnHeader column={column} title="Coin Name" />,
    size: 200,
  },
  {
    accessorKey: 'rate',
    header: 'Price',
    size: 120,
  },
  {
    accessorKey: 'ask',
    header: 'Ask',
    size: 120,
  },
  {
    accessorKey: 'bid',
    header: 'Bid',
    size: 120,
  },
  {
    accessorKey: 'diff24h',
    header: 'Day',
    size: 140,
  },
];

export const Rates = observer(() => {
  useEffect(() => {
    ratesStore.fetchCoins();
  }, []);

  const isLoading = ratesStore.isLoading;
  const isDataAvailable = ratesStore.filteredCoins !== undefined;
  const isRenderContent = !isLoading && isDataAvailable;

  return (
    <div className="container h-full mx-auto p-4 md:py-10 grid grid-rows-[auto,1fr] gap-5">
      <header>
        <h1 className="mb-1 break-words text-4xl text-zinc-800">Cryptocurrency rates</h1>
        <p className="mb-3 text-zinc-500">Table of cryptocurrency rates filtered by currency code.</p>

        {isRenderContent && (
          <div className="flex justify-between gap-4">
            <Input
              className="max-w-[50%]"
              onChange={(e) => ratesStore.setSearchQuery(e.target.value)}
              placeholder="Search"
            />

            <Select onValueChange={(value) => ratesStore.setSelectedCurrency(value as CurrencyCode)}>
              <SelectTrigger className="w-[180px] font-medium">
                <SelectValue placeholder={ratesStore.selectedCurrency.toLocaleUpperCase()} />
              </SelectTrigger>
              <SelectContent>
                {currencyCodes
                  .toSorted((a, b) => a.localeCompare(b))
                  .map((currency) => (
                    <SelectItem key={currency} value={currency} className="font-medium">
                      {currency.toLocaleUpperCase()}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </header>

      {isLoading && <p className="place-self-center">Loading...</p>}
      {!isDataAvailable && <p className="place-self-center">No data available.</p>}

      {isRenderContent && (
        <DataTable
          columns={columns}
          data={ratesStore.filteredCoins.map((coin) => ({
            coinName: (
              <NavLink to={`/rates/${coin.coinName}`} className="font-semibold inline-block w-full hover:text-blue-400">
                {coin.coinName.toLocaleUpperCase()}
              </NavLink>
            ),

            rate: <CellNumberContent>{coin.rate}</CellNumberContent>,
            ask: <CellNumberContent color="red">{coin.ask}</CellNumberContent>,
            bid: <CellNumberContent color="green">{coin.bid}</CellNumberContent>,
            diff24h: <Diff diff={coin.diff24h} />,
          }))}
        />
      )}
    </div>
  );
});
