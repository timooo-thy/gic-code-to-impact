import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TradeLineChart } from "./TradeLineChart";
import { TradePieChart } from "./TradePieChart";
import { tradeData } from "@/lib/constants";

export default function TradeSummaryCard() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Weekly Trade Summary
        </CardTitle>
        <CardDescription>
          {tradeData.startDate} to {tradeData.endDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-muted-foreground">
              Total Trades
            </span>
            <span className="text-2xl font-bold">{tradeData.totalTrades}</span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-muted-foreground">
              Profit/Loss
            </span>
            <span
              className={`text-2xl font-bold ${tradeData.profitLoss >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              ${tradeData.profitLoss.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-muted-foreground">
              Win Rate
            </span>
            <span className="text-2xl font-bold">{tradeData.winRate}%</span>
          </div>
          <div className="flex items-center">
            <Badge
              variant={"outline"}
              className={`text-sm text-white h-8 ${
                tradeData.profitLoss >= 0 ? "bg-green-600 " : "bg-red-600 "
              }   `}
            >
              {tradeData.profitLoss >= 0
                ? "Profitable Week"
                : "Loss-making Week"}
            </Badge>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">ChatGPT Summary</h3>
          <p className="text-sm text-muted-foreground">
            {tradeData.chatGPTSummary}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <TradeLineChart />
          <TradePieChart />
        </div>
      </CardContent>
    </Card>
  );
}
