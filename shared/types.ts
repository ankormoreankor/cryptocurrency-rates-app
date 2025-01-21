export type CurrencyCode =
  | 'dash'
  | 'sand'
  | 'eurs'
  | 'gala'
  | 'pax'
  | 'uni'
  | 'link'
  | 'pyusd'
  | 'usdp'
  | 'ape'
  | 'usd'
  | 'snx'
  | 'ltc'
  | 'luna'
  | 'xrp'
  | 'ilv'
  | 'fil'
  | 'bat'
  | 'tusd'
  | 'gmt'
  | 'cad'
  | 'bnb'
  | 'avax'
  | 'zrx'
  | 'paxg'
  | 'atom'
  | 'zil'
  | 'eur'
  | 'dai'
  | 'egld'
  | 'omg'
  | 'cake'
  | 'bch'
  | 'btc'
  | 'comp'
  | 'mana'
  | 'doge'
  | 'gbp'
  | 'icp'
  | 'yfi'
  | 'not'
  | 'near'
  | 'ftt'
  | 'usdt'
  | 'bnt'
  | 'ftm'
  | 'theta'
  | 'xlm'
  | 'xtz'
  | 'axs'
  | 'sol'
  | 'eth'
  | 'aud'
  | 'eos'
  | 'chf'
  | 'ada'
  | 'usdc'
  | 'sushi'
  | 'mkr'
  | 'vet';

export interface CurrencyRate {
  rate: number;
  ask: number;
  bid: number;
  diff24h: number;
}

export type CurrencyRates = Record<CurrencyCode, CurrencyRate>;

export type CoinsRates = {
  [coinName: string]: CurrencyRates;
};

export interface CurrentCoinRate {
  coinName: string;
  currencyCode: CurrencyCode;
  rate: number;
  ask: number;
  bid: number;
  diff24h: number;
}
