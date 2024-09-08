import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ragData: string = `
APPLE STOCK NEWS:
Here is a summary of the key stock news about Apple from Friday:

Apple's stock price closed at $222.38 on Friday, with the stock trading in a range of $219.77 to $225.24 during the day. The stock is up nearly 15% so far in 2024.
Most Wall Street analysts are bullish on Apple stock ahead of the company's upcoming "It's Glowtime" event on Monday, September 9th. The event is expected to feature the unveiling of the new iPhone 16 with enhanced AI capabilities, as well as new AirPods and Apple Watch models. [2]
Over 69% of the analysts covering Apple have a "buy" rating on the stock, with a consensus price target of $244.06 - representing a potential upside of 10.5% from Friday's closing price. Analysts are optimistic that the new AI-powered iPhone 16 could kick off a "golden upgrade cycle" for Apple. [2]
Apple's market capitalization stands at $3.386 trillion as of Friday's close. The company has a price-to-earnings (P/E) ratio of 33.62 based on trailing 12-month earnings, and a forward P/E of 30.41. [1][3]
In other news, legendary investor Warren Buffett's Berkshire Hathaway disclosed selling a portion of its Apple stake in the second quarter of 2024, though Apple remains one of Berkshire's largest holdings. [1]
Learn more:

Here is a summary of the key stock news about Apple from Friday:

- Apple's stock price closed at $222.38 on Friday, with the stock trading in a range of $219.77 to $225.24 during the day. The stock is up nearly 15% so far in 2024.

- Most Wall Street analysts are bullish on Apple stock ahead of the company's upcoming "It's Glowtime" event on Monday, September 9th. The event is expected to feature the unveiling of the new iPhone 16 with enhanced AI capabilities, as well as new AirPods and Apple Watch models. [[2]](https://www.investopedia.com/what-wall-street-analysts-think-of-apple-stock-ahead-of-iphone-16-event-monday-8706999)

- Over 69% of the analysts covering Apple have a "buy" rating on the stock, with a consensus price target of $244.06 - representing a potential upside of 10.5% from Friday's closing price. Analysts are optimistic that the new AI-powered iPhone 16 could kick off a "golden upgrade cycle" for Apple. [[2]](https://www.investopedia.com/what-wall-street-analysts-think-of-apple-stock-ahead-of-iphone-16-event-monday-8706999)

- Apple's market capitalization stands at $3.386 trillion as of Friday's close. The company has a price-to-earnings (P/E) ratio of 33.62 based on trailing 12-month earnings, and a forward P/E of 30.41. [[1]](https://finance.yahoo.com/quote/AAPL/)[[3]](https://www.cnbc.com/quotes/AAPL)

- In other news, legendary investor Warren Buffett's Berkshire Hathaway disclosed selling a portion of its Apple stake in the second quarter of 2024, though Apple remains one of Berkshire's largest holdings. [[1]](https://finance.yahoo.com/quote/AAPL/)

---
Learn more:
1. [Apple Inc. (AAPL) Stock Price, News, Quote & History - Yahoo Finance](https://finance.yahoo.com/quote/AAPL/)
2. [What Wall Street Analysts Think of Apple Stock Ahead of Monday's iPhone 16 Event](https://www.investopedia.com/what-wall-street-analysts-think-of-apple-stock-ahead-of-iphone-16-event-monday-8706999)
3. [AAPL: Apple Inc - Stock Price, Quote and News - CNBC](https://www.cnbc.com/quotes/AAPL)

`;

export const internalData = `
INTERNAL DATA:
Based on the information provided, here's a summary of your trades:

Total number of trades: 9
Date range: From April 1, 2024 to April 8, 2024 (with one trade from March 7, 2024)
Instruments traded:
Bonds: 8 trades
Credit Linked Notes: 1 trade
Total amount traded: $91,854,822 (assuming all amounts are in USD)
Most common counterparty: Citibank International Ltd (5 trades)
Exchanges used:
BOMBAY STOCK EXCHANGE (3 trades)
Others include NASDAQ OMX HELSINKII, Hong Kong Stock Exchange, China Financial Futures Exchange, NASDAQ CAPITAL MARKET(CM), Bolsas Y Mercados Argentinos, and Borsa Italiana
Risk countries:
India (3 trades)
Hong Kong (2 trades)
Others include Finland, United States, Argentina, and Italy
Currency diversity:
Trade currencies: 9 different currencies used (PLN, COP, VND, GBP, USD, KZT, AUD, ILS, EUR)
Settlement currencies: 9 different currencies used (GBP, USD, CAD, AED, CHF, DKK, ARS, USD, NZD)
Largest trade: $19,500,000 in Bonds on April 4, 2024, with Citibank International Ltd on BOMBAY STOCK EXCHANGE
Smallest trade: $754,822 in Credit Linked Notes on March 7, 2024, with BNP Paribas on NASDAQ OMX HELSINKII
-------
If user asks about "APPLE NEWS", repeat the apple news exactly the same way in the next message.
ELSE, use the repeat the INTERNAL DATA in the next message.
`;
