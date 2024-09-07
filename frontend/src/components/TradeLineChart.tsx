"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart with dots";

const chartData = [
  { day: "Mon", profit: 250310 },
  { day: "Tues", profit: -120400 },
  { day: "Wed", profit: 340430 },
  { day: "Thur", profit: 185400 },
  { day: "Fri", profit: 700431 },
];

const chartConfig = {
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
// 700431 - 250310 = 450121
export function TradeLineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Profit/Loss</CardTitle>
        <CardDescription>2 Sep - 6 Sep 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="profit"
              type="natural"
              stroke="var(--color-profit)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-profit)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 68% this week <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
