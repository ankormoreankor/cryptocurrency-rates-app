import { makeAutoObservable, runInAction } from 'mobx';
import type {
  CoinExchangeRates,
  CoinRateDetail,
  CoinRateSummary,
  CurrencyCode,
} from '../types';
import Fuse from 'fuse.js';

const formatNumber = (n: number) => Number(n.toFixed(6));

class RatesStore {
  data: CoinExchangeRates = {} as CoinExchangeRates;
  coinRateSummary: CoinRateSummary[] = [] as CoinRateSummary[];
  isLoading = false;
  searchQuery: string = '';
  selectedCurrency: CurrencyCode = 'usd';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCoins() {
    this.setLoading(true);

    try {
      const response = await fetch(
        'https://app.youhodler.com/api/v3/rates/extended',
      );
      const data: CoinExchangeRates = await response.json();
      this.data = data;

      runInAction(() => {
        this.coinRateSummary = Object.entries(this.data)
          .map(([coinName, rates]) => {
            const ratesData = Object.entries(rates);

            return {
              coinName,
              rates: ratesData.map(([currencyCode, data]) => ({
                currencyCode: currencyCode as CurrencyCode,
                rate: formatNumber(data.rate),
                ask: formatNumber(data.ask),
                bid: formatNumber(data.bid),
                diff24h: formatNumber(data.diff24h),
              })),
            };
          })
          .toSorted((a, b) => a.coinName.localeCompare(b.coinName));
      });
    } catch (error) {
      console.error('Failed to fetch coins:', error);
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  setSelectedCurrency(currency: CurrencyCode) {
    this.selectedCurrency = currency;
  }

  get filteredCoins() {
    const fuse = new Fuse(this.coinRateSummary, {
      keys: ['coinName'],
      threshold: 0.3,
    });

    const searchResults = this.searchQuery
      ? fuse.search(this.searchQuery).map((r) => r.item)
      : this.coinRateSummary;

    return searchResults
      .map((coin) => {
        const [filteredCoinRates] = coin.rates.filter(
          (data) => data.currencyCode === this.selectedCurrency,
        );

        if (!filteredCoinRates) {
          return false;
        }

        return {
          coinName: coin.coinName,
          rate: filteredCoinRates.rate,
          ask: filteredCoinRates.ask,
          bid: filteredCoinRates.bid,
          diff24h: filteredCoinRates.diff24h,
        };
      })
      .filter(Boolean) as CoinRateDetail[];
  }
}

export const ratesStore = new RatesStore();
