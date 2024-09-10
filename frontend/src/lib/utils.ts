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
ID	Trade Date	Instrument	Amount	Counterparty	Exchange	Risk Country	Trade CCY	Settlement CCY
1	2024-03-07T00:54:01+00:00	Credit Linked Notes	$754,822	BNP Paribas	NASDAQ OMX HELSINKII	FINLAND	PLN	GBP
2	2024-04-06T04:31:08+00:00	Bonds	$7,500,000	CIBC World Markets Inc.	Hong Kong Stock Exchange	HONG KONG	COP	USD
3	2024-04-05T09:57:27+00:00	Bonds	$12,000,000	CIMB Bank Berhad	China Financial Futures Exchange	HONG KONG	VND	CAD
4	2024-04-08T09:09:08+00:00	Bonds	$16,000,000	Citibank (China) Co. Ltd	BOMBAY STOCK EXCHANGE	INDIA	GBP	AED
5	2024-04-04T06:45:52+00:00	Bonds	$19,500,000	Citibank International Ltd	BOMBAY STOCK EXCHANGE	INDIA	USD	CHF
6	2024-04-07T07:00:10+00:00	Bonds	$14,200,000	Citibank International Ltd	BOMBAY STOCK EXCHANGE	INDIA	KZT	DKK
7	2024-04-03T22:25:29+00:00	Bonds	$9,800,000	Citibank International Ltd	NASDAQ CAPITAL MARKET(CM)	UNITED STATES	AUD	ARS
8	2024-04-07T06:53:10+00:00	Bonds	$5,400,000	Citibank International Ltd	Bolsas Y Mercados Argentinos	ARGENTINA	ILS	USD
9	2024-04-01T20:31:27+00:00	Bonds	$6,700,000	Citibank International Ltd	Borsa Italiana	ITALY	EUR	NZD
10	2024-04-06T12:19:07+00:00	Bonds	$15,000,000	Citibank International Ltd	Borsa Italiana	ITALY	CHF	IDR
11	2024-04-03T17:30:25+00:00	Bonds	$7,300,000	CIMB Bank Berhad	Borsa Italiana	ITALY	PHP	PHP
12	2024-04-06T00:35:52+00:00	Equities	$9,300,000	Itau Corretora De Valores S.A.	Bolsas Y Mercados Argentinos	ARGENTINA	HKD	USD
13	2024-04-07T18:31:58+00:00	Equities	$8,300,000	J&E Davy	ASX TRADE24	AUSTRALIA	PKR	AUD
14	2024-04-01T15:49:22+00:00	Equities	$12,500,000	J.P. Morgan Securities (Asia Pacific) Limited	ASX TRADE24	AUSTRALIA	UYU	AUD
15	2024-04-06T13:27:02+00:00	Equities	$14,100,000	J.P. Morgan Securities (Far East) Limited	Vienna Stock Exchange	AUSTRIA	AED	EUR
16	2024-04-02T16:10:47+00:00	Equities	$6,200,000	J.P. Morgan Securities LLC	Kuwait Stock Exchange	BAHRAIN	PLN	KWD
17	2024-04-05T12:20:12+00:00	Equities	$8,100,000	J.P. Morgan Securities Plc	Kuwait Stock Exchange	BAHRAIN	DOP	KWD
18	2024-04-05T09:14:49+00:00	Equities	$11,000,000	J.P. Morgan Securities (Far East) Limited	NYSE EURONEXTBRUSSELS	BELGIUM	SGD	BEL
19	2024-04-08T10:33:12+00:00	Equities	$17,700,000	J.P. Morgan Securities LLC	SANTIAGO STOCK EXCHANGE	CHILE	MXN	USD
20	2024-04-06T04:38:13+00:00	Equities	$9,600,000	J.P. Morgan Securities Plc	China Financial Futures Exchange	CHINA	SAR	CNY
21	2024-04-04T12:50:12+00:00	Equities	$12,300,000	Kotak Securities Limited	Not Applicable	COLUMBIA	LKR	MXN
22	2024-04-07T02:20:43+00:00	Equities	$6,700,000	J.P. Morgan Securities (Far East) Limited	Not Applicable	CZECH REPUBLIC	NOK	DOP
23	2024-04-04T13:44:37+00:00	Equities	$8,800,000	J.P. Morgan Securities LLC	OMX Nordic Exchange Copenhagen	DENMARK	EGP	DKK
24	2024-04-04T19:02:11+00:00	Equities	$9,900,000	J.P. Morgan Securities Plc	OMX Nordic Exchange Copenhagen	DENMARK	GBP	DKK
25	2024-04-07T11:39:47+00:00	Equities	$10,500,000	Macquarie Securities Korea Limited	OMX Nordic Exchange Copenhagen	DENMARK	AUD	COP
26	2024-04-08T08:32:55+00:00	Equities	$6,500,000	MainFirst Bank AG	OMX Nordic Exchange Copenhagen	DENMARK	UAH	BEF
27	2024-04-05T02:49:20+00:00	Equities	$7,200,000	MEDIOBANCA- Banca di Credito Finanziario S.p.A.	OMX Nordic Exchange Copenhagen	DENMARK	KRW	NGN
28	2024-04-05T03:34:06+00:00	Equities	$8,400,000	Merrill Lynch Canada Inc.	Not Applicable	DOMINICAN REPUBLIC	QAR	RUB
--------------------------------
If user asks about APPLE NEWS, repeat the apple news exactly the same way in the next message.
ELSE, use the SUMMARISE THIS INTERNAL DATA in the next message.
`;
