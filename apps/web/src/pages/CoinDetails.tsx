import { DataTable } from '@components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ratesStore } from '../../../../shared/stores/RatesStore';
import { Diff } from '@components/Diff';
import { CellNumberContent } from '@components/table';
import { MainLayout } from '@layouts/MainLayout';

type ColumnKeys = 'coin' | 'rate' | 'ask' | 'bid' | 'diff24h';

type TableData = { [key in ColumnKeys]: ReactNode };

export const columns: ColumnDef<TableData>[] = [
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

export const CoinDetails = () => {
  const navigate = useNavigate();
  const { coinName } = useParams();

  const coinData = ratesStore.filteredCoins.find((coin) => coin.coinName === coinName);

  if (coinName === undefined || coinData === undefined) {
    navigate('/rates');
    return null;
  }

  const columnsExtended = [
    {
      accessorKey: 'coin',
      header: coinName.toLocaleUpperCase(),
      size: 300,
    },
    ...columns,
  ];

  const coinRates = ratesStore.coinRateSummary.find((coin) => coin.coinName === coinName)?.rates;

  if (coinRates === undefined) {
    return false;
  }

  return (
    <MainLayout headerProps={{ isWithBreadcrumbs: true }}>
      <div className="container h-full mx-auto p-4 md:py-10 grid grid-rows-[auto,1fr] gap-5">
        <header>
          <h1 className="mb-1 break-words text-4xl text-zinc-800">{coinName.toLocaleUpperCase()}</h1>
          <p className="mb-3 text-zinc-500">Detailed rates information</p>
        </header>

        <DataTable
          columns={columnsExtended}
          data={coinRates.map((data) => ({
            coin: <span className="font-semibold">{`${coinName}/${data.currencyCode}`.toLocaleUpperCase()}</span>,
            rate: <CellNumberContent>{data.rate}</CellNumberContent>,
            ask: <CellNumberContent color="red">{data.ask}</CellNumberContent>,
            bid: <CellNumberContent color="green">{data.bid}</CellNumberContent>,
            diff24h: <Diff diff={data.diff24h} />,
          }))}
        />
      </div>
    </MainLayout>
  );
};
