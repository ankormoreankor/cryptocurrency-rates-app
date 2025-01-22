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
import clsx from 'clsx';

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
  },
  {
    accessorKey: 'rate',
    header: 'Rate',
  },
  {
    accessorKey: 'ask',
    header: 'Ask',
  },
  {
    accessorKey: 'bid',
    header: 'Bid',
  },
  {
    accessorKey: 'diff24h',
    header: 'Diff 24h',
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
        <div className="container h-full mx-auto py-10 grid grid-rows-[auto,1fr] gap-5">
          <header>
            <h1 className="mb-1 break-words text-4xl text-zinc-800">Cryptocurrency rates</h1>
            <p className="mb-3 text-zinc-500">Table of cryptocurrency rates filtered by currency code.</p>

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
          </header>

          <DataTable
            columns={columns}
            data={ratesStore.filteredCoins.map((coin) => ({
              coinName: (
                <NavLink to={`/rates/${coin.coinName}`} className="font-medium inline-block w-full hover:text-blue-400">
                  {coin.coinName.toLocaleUpperCase()}
                </NavLink>
              ),

              rate: <span className="">{coin.rate}</span>,
              ask: <span className="text-red-600 ">{coin.ask}</span>,
              bid: <span className="text-green-600 ">{coin.bid}</span>,

              diff24h: (
                <span className={clsx(coin.diff24h > 0 && ' text-green-600', coin.diff24h < 0 && ' text-red-600')}>
                  {coin.diff24h} {coin.diff24h > 0 ? '▲' : coin.diff24h < 0 ? '▼' : ''}
                </span>
              ),
            }))}
            tableHeight="100%"
          />
        </div>
      )}
    </>
  );
});
