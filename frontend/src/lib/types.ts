export enum Role {
  Trader = "trader",
  Admin = "admin",
}

export type IncomingRequestType = {
  id: string;
  instrument_name: string;
  currency: string;
  country: string;
  exchange_name: string;
  department: string;
  user_email: string;
};
