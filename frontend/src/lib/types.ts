export enum Role {
  Trader = "trader",
  Admin = "admin",
}

export type IncomingRequestType = {
  id: number;
  email: string;
  instrument_name: string;
  trade_ccy: string;
  settlement_ccy: string;
  country: string;
  exchange_name: string;
  department: string;
  approved: boolean;
};
