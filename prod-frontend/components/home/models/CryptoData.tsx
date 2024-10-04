export interface CryptoData {
    id: string;
    partitionKey: string;
    bitcoin: {
      usd: number;
      usd_24h_vol: number;
      usd_24h_change: number;
      last_updated_at: number;
    };
    ethereum: {
      usd: number;
      usd_24h_vol: number;
      usd_24h_change: number;
      last_updated_at: number;
    };
    chainlink: {
      usd: number;
      usd_24h_vol: number;
      usd_24h_change: number;
      last_updated_at: number;
    };
  }