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
import DashboardCard from "@/components/DashboardCard";
import { useState } from "react";

export const description =
  "An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image. The main content area is divided into two rows. The first row has a grid of cards with statistics. The second row has a grid of cards with a table of recent transactions and a list of recent sales.";

const instrumentGroup = [
  {
    name: "Bonds",
    amount: 54532,
    description: "Fixed income securities",
  },
  {
    name: "Cash",
    amount: 23432,
    description: "Cash and cash equivalents",
  },
  {
    name: "Derivatives",
    amount: 23432,
    description: "Options, futures, and swaps",
  },
  {
    name: "Equities",
    amount: 23432,
    description: "Stocks and shares",
  },
  {
    name: "FX",
    amount: 23432,
    description: "Foreign exchange",
  },
  {
    name: "Margins",
    amount: 23432,
    description: "Margin accounts",
  },
  {
    name: "Options",
    amount: 23432,
    description: "Options contracts",
  },
  {
    name: "OTC Derivatives",
    amount: 23432,
    description: "Over-the-counter derivatives",
  },
  {
    name: "Repos/Reverse Repos",
    amount: 23432,
    description: "Repurchase agreements",
  },
  {
    name: "Structured Finance Products",
    amount: 23432,
    description: "Asset-backed securities",
  },
];
const counterPartyGroup = [
  {
    name: "Bonds",
    counterparty: "Abbey National Treasury Services PLC",
    date: "5/9/24",
    amount: 80335865,
  },
  {
    name: "Bonds",
    counterparty: "Abbey National Treasury Services PLC",
    date: "5/9/24",
    amount: 50335865,
  },
  {
    name: "Bonds",
    counterparty: "Abbey National Treasury Services PLC",
    date: "5/9/24",
    amount: 335865,
  },
  {
    name: "Bonds",
    counterparty: "Abbey National Treasury Services PLC",
    date: "5/9/24",
    amount: 10335865,
  },
  {
    name: "Bonds",
    counterparty: "Abbey National Treasury Services PLC",
    date: "5/9/24",
    amount: 20335865,
  },
  {
    name: "Bonds",
    counterparty: "Abbey National Treasury Services PLC",
    date: "5/9/24",
    amount: 40335865,
  },
  {
    name: "Bonds",
    counterparty: "Abbey National Treasury Services PLC",
    date: "5/9/24",
    amount: 4033585,
  },
  {
    name: "Bonds",
    counterparty: "Abbey National Treasury Services PLC",
    date: "5/9/24",
    amount: 403365,
  },

  {
    name: "FX",
    counterparty: "Abbey National Treasury Services PLC",
    date: "5/9/24",
    amount: 40335865,
  },
];
export default function Dashboard() {
  const [selectedInstrument, setSelectedInstrument] = useState("Bonds");

  return (
    <main className="flex min-h-screen w-4/5 flex-col m-auto">
      <Navbar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
          {instrumentGroup.map((instrument) => (
            <DashboardCard
              key={instrument.name}
              title={instrument.name}
              amount={instrument.amount}
              description={instrument.description}
              onClick={() => setSelectedInstrument(instrument.name)}
            />
          ))}
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 h-[500px]">
          <LimitTable
            instrumentName="Bonds"
            selectedInstrument={selectedInstrument}
          />
        </div>
      </main>
    </main>
  );
}

type LimitTableProps = {
  instrumentName: string;
  selectedInstrument: string;
};
const LimitTable = ({
  instrumentName,
  selectedInstrument,
}: LimitTableProps) => {
  return (
    <Card className="xl:col-span-full">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Counterparties</CardTitle>
          <CardDescription>
            Available counterparties for {instrumentName}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Counterparty</TableHead>
              <TableHead>Daily Limit</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {counterPartyGroup
              .filter(
                (counterParty) => counterParty.name === selectedInstrument
              )
              .map((counterParty) => {
                return (
                  <TableRow key={counterParty.counterparty}>
                    <TableCell>
                      <div className="font-medium">
                        {counterParty.counterparty}
                      </div>
                    </TableCell>
                    <TableCell>${counterParty.amount}</TableCell>
                    <TableCell className="text-right">
                      {counterParty.date}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
