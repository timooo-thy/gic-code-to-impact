"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import TradeSummaryCard from "@/components/TradeSummaryCard";
import { useEffect, useState } from "react";
import { ChatOverlay } from "./ChatOverlay";
import { toast } from "sonner";

type Trade = {
  instrument: string;
  trade_id: number;
  exchange: string;
  settlement_ccy: string;
  trade_date: string;
  risk_country: string;
  instrument_group: string;
  department: string;
  trader_id: number;
  trade_ccy: string;
  counterparty: string;
  amount: number;
};

export default function UserDashboard() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [insights, setInsights] = useState<string>("");
  const [value, setValue] = useState("");

  const context = `
  You are given the following information about the trades a trader at GIC makes:
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
You are a helpful assistant and you should repsond to any queries that trader may have by using the data provided. Respond succinlty, but in properly phrased sentences. This is the question`;

  const fetchTrades = async () => {
    const trader_id = 1;
    const response = await fetch(
      process.env.NEXT_PUBLIC_FASTAPI_URL + `/trades/${trader_id}`
    );
    if (!response.ok) {
      toast.error("Error fetching trades");
    }
    const trades = (await response.json()) as Trade[];
    setTrades(trades);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleGenerateResponse = async () => {
    setLoading(true);
    setInsights(""); // Clear previous response;
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: context + value,
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await res.json();
      setInsights(data.candidates[0].content.parts[0].text);
    } catch (error) {
      setInsights("Failed to generate response.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  return (
    <main className="flex min-h-screen w-4/5 flex-col m-auto">
      <Navbar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 max-h-[500px]">
          <LimitTable
            trades={trades}
            loading={loading}
            handleGenerateResponse={handleGenerateResponse}
            value={value}
            handleChange={handleChange}
            insights={insights}
          />
        </div>
      </main>
    </main>
  );
}

type LimitTableProps = {
  trades: Trade[];
  loading: boolean;
  handleGenerateResponse: () => void;
  value: string;
  handleChange: (e: any) => void;
  insights: string;
};

const LimitTable = ({
  trades,
  loading,
  handleGenerateResponse,
  value,
  handleChange,
  insights,
}: LimitTableProps) => {
  return (
    <>
      <Card className="col-span-full h-[400px] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Trades</CardTitle>
          <CardDescription>Past 7 days</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto">
          <Table className="relative">
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead className="text-left">ID</TableHead>
                <TableHead className="text-left">Trade Date</TableHead>
                <TableHead className="text-left">Instrument</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-left">Counterparty</TableHead>
                <TableHead className="text-left">Exchange</TableHead>
                <TableHead className="text-left">Risk Country </TableHead>
                <TableHead className="text-left">Trade CCY </TableHead>
                <TableHead className="text-right pr-2">
                  Settlement CCY{" "}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade) => (
                <TableRow key={trade.trade_id}>
                  <TableCell className="font-medium">
                    {trade.trade_id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {trade.trade_date}
                  </TableCell>
                  <TableCell className="font-medium">
                    {trade.instrument}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${trade.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{trade.counterparty}</TableCell>
                  <TableCell>{trade.exchange}</TableCell>
                  <TableCell>{trade.risk_country}</TableCell>
                  <TableCell>{trade.trade_ccy}</TableCell>
                  <TableCell className="text-right">
                    {trade.settlement_ccy}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ChatOverlay />
      {/* <Card className='col-span-full h-[250px] flex flex-col'>
        <CardHeader className='flex-shrink-0'>
          <CardTitle>Chat with your trades</CardTitle>
          <CardDescription>
            Example questions: what types of instruments I traded the most?
          </CardDescription>
        </CardHeader>
        <CardContent className='flex-grow overflow-auto'>
          <textarea
            className='w-full h-10 p-2 rounded border'
            placeholder='Type your question here...'
            value={value}
            onChange={handleChange}
          ></textarea>
          <button
            className='px-4 py-2 mb-2 bg-blue-500 text-white rounded w-full'
            onClick={handleGenerateResponse}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate insights'}
          </button>
          {loading ? (
            <CardDescription>Loading...</CardDescription>
          ) : (
            <CardDescription>
              {insights || 'Click the button to generate insights.'}
            </CardDescription>
          )}
        </CardContent>
      </Card> */}
      <TradeSummaryCard />
    </>
  );
};
