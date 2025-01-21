import { makeAutoObservable } from 'mobx';
import type { CoinsRates, CurrencyCode, CurrentCoinRate } from '../types';
import Fuse from 'fuse.js';

class RatesStore {
  data: CoinsRates = {} as CoinsRates;
  coinRates: CurrentCoinRate[] = [] as CurrentCoinRate[];
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
      const data: CoinsRates = await response.json();
      this.data = data;

      this.coinRates = Object.entries(data)
        .map(([coinName, rates]) => {
          const rate = rates[this.selectedPair];

          if (!rate) return null;

          return {
            coinName,
            currencyCode: this.selectedPair,
            rate: rate.rate,
            ask: rate.ask,
            bid: rate.bid,
            diff24h: rate.diff24h,
          };
        })
        .filter((coin): coin is CurrentCoinRate => coin !== null);
    } catch (error) {
      console.error('Failed to fetch coins:', error);
    } finally {
      this.isLoading = false;
    }
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  setSelectedPair(pair: CurrencyCode) {
    this.selectedPair = pair;
  }

  get filteredCoins() {
    const fuse = new Fuse(this.coinRates, {
      keys: ['coinName'],
      threshold: 0.3,
    });
    const searchResults = this.searchQuery
      ? fuse.search(this.searchQuery).map((r) => r.item)
      : this.coinRates;

    return searchResults.filter(
      (coin) => coin.currencyCode === this.selectedPair,
    );
  }
}

export const ratesStore = new RatesStore();
