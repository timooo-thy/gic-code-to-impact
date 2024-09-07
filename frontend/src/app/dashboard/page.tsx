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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/db";

type CounterPartyLimit = {
  instrument_group: string;
  available_limit: number;
};

type InstrumentGroupParties = {
  instrument_group: string;
  id: number;
  currency: string;
  data_date: string;
  available_limit: number;
  counterparty: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [selectedInstrument, setSelectedInstrument] = useState("Bonds");
  const [counterPartyLimits, setCounterPartyLimits] = useState<
    CounterPartyLimit[]
  >([]);
  const [instrumentGroupParties, setInstrumentGroupParties] = useState<
    InstrumentGroupParties[]
  >([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      router.push("/sign-in");
    }

    const handleUpdates = (payload: any) => {
      const newInstrumentGroupParty = payload.new as InstrumentGroupParties;

      const difference =
        instrumentGroupParties.filter(
          (party) => party.counterparty === newInstrumentGroupParty.counterparty
        )[0]?.available_limit - newInstrumentGroupParty.available_limit;

      setInstrumentGroupParties((prev) => [
        newInstrumentGroupParty,
        ...prev.filter(
          (party) => party.counterparty !== newInstrumentGroupParty.counterparty
        ),
      ]);

      setCounterPartyLimits((prev) => {
        const updatedCounterPartyLimits = prev.map((limit) => {
          if (
            limit.instrument_group === newInstrumentGroupParty.instrument_group
          ) {
            return {
              ...limit,
              available_limit: difference,
            };
          }
          return limit;
        });
        return updatedCounterPartyLimits;
      });
    };

    const channel = supabase
      .channel("available_limits")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "available_limits" },
        handleUpdates
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  useEffect(() => {
    const fetchCounterPartyLimits = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FASTAPI_URL +
          "/approved_instruments/counterparty/sum/"
      );
      if (!response.ok) {
        console.log("Error fetching instrument group limits");
      }

      const counterPartyLimits = (await response.json()) as CounterPartyLimit[];
      setCounterPartyLimits(counterPartyLimits);
    };

    fetchCounterPartyLimits();
  }, []);

  useEffect(() => {
    const fetchInstrumentGroupParties = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FASTAPI_URL +
          `/approved_instruments/counterparty/${selectedInstrument}`
      );
      if (!response.ok) {
        console.log("Error fetching counterparties");
      }

      const counterPartyLimits =
        (await response.json()) as InstrumentGroupParties[];
      counterPartyLimits.sort((a, b) =>
        a.counterparty.localeCompare(b.counterparty)
      );

      setInstrumentGroupParties(counterPartyLimits);
    };

    fetchInstrumentGroupParties();
  }, [selectedInstrument]);

  return (
    <main className="flex min-h-screen w-4/5 flex-col m-auto">
      <Navbar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
          {counterPartyLimits.map((instrument, id) => (
            <DashboardCard
              key={id}
              title={instrument.instrument_group}
              amount={instrument.available_limit}
              onClick={() => setSelectedInstrument(instrument.instrument_group)}
            />
          ))}
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 max-h-[500px]">
          <LimitTable instrumentGroupParties={instrumentGroupParties} />
        </div>
      </main>
    </main>
  );
}

type LimitTableProps = {
  instrumentGroupParties: InstrumentGroupParties[];
};
const LimitTable = ({ instrumentGroupParties }: LimitTableProps) => {
  return (
    <Card className="col-span-full h-[500px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Counterparties</CardTitle>
        <CardDescription>
          Available counterparties for{" "}
          {instrumentGroupParties[0]?.instrument_group}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <Table className="relative">
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead className="text-left">Counterparty</TableHead>
              <TableHead>Daily Limit</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instrumentGroupParties.map((counterParty) => (
              <TableRow key={counterParty.counterparty}>
                <TableCell className="font-medium">
                  {counterParty.counterparty}
                </TableCell>
                <TableCell>
                  ${counterParty.available_limit.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {counterParty.data_date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
