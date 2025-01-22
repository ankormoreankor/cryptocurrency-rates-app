export const currencyCodes = [
  'dash',
  'sand',
  'eurs',
  'gala',
  'pax',
  'uni',
  'link',
  'pyusd',
  'usdp',
  'ape',
  'usd',
  'snx',
  'ltc',
  'luna',
  'xrp',
  'ilv',
  'fil',
  'bat',
  'tusd',
  'gmt',
  'cad',
  'bnb',
  'avax',
  'zrx',
  'paxg',
  'atom',
  'zil',
  'eur',
  'dai',
  'egld',
  'omg',
  'cake',
  'bch',
  'btc',
  'comp',
  'mana',
  'doge',
  'gbp',
  'icp',
  'yfi',
  'not',
  'near',
  'ftt',
  'usdt',
  'bnt',
  'ftm',
  'theta',
  'xlm',
  'xtz',
  'axs',
  'sol',
  'eth',
  'aud',
  'eos',
  'chf',
  'ada',
  'usdc',
  'sushi',
  'mkr',
  'vet',
] as const;

export type CurrencyCode = (typeof currencyCodes)[number];

export interface ExchangeRateDetails {
  rate: number;
  ask: number;
  bid: number;
  diff24h: number;
}

export type ExchangeRatesMap = Record<CurrencyCode, ExchangeRateDetails>;

export type CoinExchangeRates = {
  [coinName: string]: ExchangeRatesMap;
};

export interface CoinRateSummary {
  coinName: string;
  rates: Array<{
    currencyCode: CurrencyCode;
    rate: number;
    ask: number;
    bid: number;
    diff24h: number;
  }>;
}

export interface CoinRateDetail {
  coinName: string;
  rate: number;
  ask: number;
  bid: number;
  diff24h: number;
}
