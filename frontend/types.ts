// {
//     "department": "ISG",
//     "id": 4001,
//     "exchange": "NASDAQ GLOBAL SELECT(GS)\t",
//     "settlement_ccy": "CZK",
//     "risk_country": "UNITED STATES",
//     "instrument_group": "Structured Finance Products",
//     "instrument": "MBS - Adjustable Rates Mortgages",
//     "trade_ccy": "CHF"
//   }

interface Instrument {
    department: string;
    id: number;
    exchnage: string;
    risk_country: string;
    investment_group: string;
    instrument: string;
    trade_ccy: string;
}

interface KeyValuePair {
    label: string;
    value: string;
}