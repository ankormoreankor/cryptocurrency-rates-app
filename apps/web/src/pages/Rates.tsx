import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ratesStore } from '../../../../shared/stores/RatesStore';

export const Rates = observer(() => {
  const { isLoading, data } = ratesStore;

  useEffect(() => {
    ratesStore.fetchCoins();
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && data !== undefined && (
        <>
          <h1>Cryptocurrency rates</h1>
          <div>{JSON.stringify(data)}</div>
        </>
      )}
    </>
  );
});
