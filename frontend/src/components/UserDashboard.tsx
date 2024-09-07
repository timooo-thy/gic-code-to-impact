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
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/db";
import uFuzzy from "@leeoniya/ufuzzy";
import { useDebounce } from "@/lib/hooks";
import SearchBar from "./SearchBar";
import TradeSummaryCard from "./TradeSummaryCard";

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

export default function UserDashboard() {
  const [selectedInstrument, setSelectedInstrument] = useState("Bonds");
  const [counterPartyLimits, setCounterPartyLimits] = useState<
    CounterPartyLimit[]
  >([]);
  const [instrumentGroupParties, setInstrumentGroupParties] = useState<
    InstrumentGroupParties[]
  >([]);

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

  useEffect(() => {
    fetchCounterPartyLimits();
  }, []);

  useEffect(() => {
    const handleUpdates = (payload: any) => {
      const newInstrumentGroupParty = payload.new as InstrumentGroupParties;

      setInstrumentGroupParties((prev) => [
        newInstrumentGroupParty,
        ...prev.filter(
          (party) => party.counterparty !== newInstrumentGroupParty.counterparty
        ),
      ]);

      setInstrumentGroupParties((prev) => {
        const updatedParties = prev.map((party) =>
          party.counterparty === newInstrumentGroupParty.counterparty
            ? newInstrumentGroupParty
            : party
        );

        return updatedParties.sort((a, b) =>
          a.counterparty.localeCompare(b.counterparty)
        );
      });

      fetchCounterPartyLimits();
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
      console.log(counterPartyLimits);
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
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ">
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
      </div>
    </main>
  );
}

type LimitTableProps = {
  instrumentGroupParties: InstrumentGroupParties[];
};

const LimitTable = ({ instrumentGroupParties }: LimitTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const instrumentGroupPartiesNames = useMemo(
    () => instrumentGroupParties.map((party) => party.counterparty),
    [instrumentGroupParties]
  );
  const u = useMemo(() => new uFuzzy(), []);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [filteredParties, setFilteredParties] =
    useState<InstrumentGroupParties[]>();

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFilteredParties(instrumentGroupParties);
      return;
    }

    const idxs = u.search(instrumentGroupPartiesNames, debouncedSearchTerm, 1);
    const filtered =
      idxs && idxs.length > 0 && idxs[0] && idxs[0].length > 0
        ? idxs[0].map((idx) => instrumentGroupParties[idx])
        : [];

    setFilteredParties(filtered);
  }, [
    debouncedSearchTerm,
    instrumentGroupPartiesNames,
    instrumentGroupParties,
    u,
  ]);

  return (
    <Card className="col-span-full h-[500px] flex flex-col ">
      <CardHeader className="w-full flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Counterparties</CardTitle>
            <CardDescription>
              Available counterparties for{" "}
              {instrumentGroupParties[0]?.instrument_group}
            </CardDescription>
          </div>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeHolder="Search Counterparty"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-grow overflow-auto">
        <Table className="relative">
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead className="text-left">Counterparty</TableHead>
              <TableHead>Daily Limit</TableHead>
              <TableHead className="text-right pr-2">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParties?.map((counterParty) => (
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
        <div>
          {filteredParties?.length === 0 && (
            <div className="text-center text-gray-500 w-full mt-10">
              No results found for <strong>{searchTerm}</strong>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
