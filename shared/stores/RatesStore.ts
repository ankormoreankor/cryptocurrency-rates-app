import { makeAutoObservable } from 'mobx';
import type { CurrencyCode, CurrencyRates } from '../types';

type CoinsRates = Array<{
  [marketName: string]: CurrencyRates;
}>;

class RatesStore {
  data: CoinsRates = {} as CoinsRates;
  isLoading = false;
  searchQuery: string = '';
  selectedPair: CurrencyCode = 'usd';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCoins() {
    this.isLoading = true;

    try {
      const response = await fetch(
        'https://app.youhodler.com/api/v3/rates/extended',
      );
      this.data = await response.json();
    } catch (error) {
      console.error('Failed to fetch coins:', error);
    } finally {
      this.isLoading = false;
    }
  }
}

export const ratesStore = new RatesStore();
