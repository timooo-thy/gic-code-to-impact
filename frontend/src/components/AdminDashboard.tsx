import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import SearchBar from "./SearchBar";
import uFuzzy from "@leeoniya/ufuzzy";
import { useDebounce } from "@/lib/hooks";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { IncomingRequestType } from "@/lib/types";
import { toast } from "sonner";
import { supabase } from "@/lib/db";

export default function AdminDashboard() {
  const [incomingRequests, setIncomingRequests] = useState<
    IncomingRequestType[]
  >([]);

  useEffect(() => {
    const fetchIncomingRequests = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FASTAPI_URL + `/approval-request/all`
      );
      if (!response.ok) {
        toast.error("Error fetching counterparties");
      }

      const counterPartyLimits =
        (await response.json()) as IncomingRequestType[];

      setIncomingRequests(counterPartyLimits);
    };
    const handleUpdates = () => {
      toast.info("A new request has been made");
      fetchIncomingRequests();
    };

    const channel = supabase
      .channel("requests")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "requests" },
        handleUpdates
      )
      .subscribe();

    fetchIncomingRequests();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className="flex min-h-screen w-4/5 flex-col m-auto">
      <Navbar />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 max-h-[500px]">
          <LimitTable incomingRequests={incomingRequests} />
        </div>
      </div>
    </main>
  );
}

type LimitTableProps = {
  incomingRequests: IncomingRequestType[];
};

const LimitTable = ({ incomingRequests }: LimitTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const requestors = useMemo(
    () => incomingRequests.map((request) => request.email),
    [incomingRequests]
  );
  const u = useMemo(() => new uFuzzy(), []);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [filteredRequestors, setFilteredRequestors] =
    useState<IncomingRequestType[]>();

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFilteredRequestors(incomingRequests);
      return;
    }

    const idxs = u.search(requestors, debouncedSearchTerm, 1);
    const filtered =
      idxs && idxs.length > 0 && idxs[0] && idxs[0].length > 0
        ? idxs[0].map((idx) => incomingRequests[idx])
        : [];

    setFilteredRequestors(filtered);
  }, [debouncedSearchTerm, incomingRequests, requestors, u]);

  return (
    <Card className="col-span-full h-[600px] flex flex-col">
      <CardHeader className="w-full flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Incoming requests</CardTitle>
            <CardDescription>
              {incomingRequests.length} incoming requests for approval
            </CardDescription>
          </div>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeHolder="Search Requestor..."
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <Table className="relative">
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead className="text-left">Requester</TableHead>
              <TableHead>Instrument Name</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Exchange Name</TableHead>
              <TableHead>Approval Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequestors &&
              filteredRequestors.map((requestor) => (
                <TableRow key={requestor.id} className="h-16">
                  <TableCell className="font-medium">
                    {requestor.email}
                  </TableCell>
                  <TableCell>{requestor.instrument_name}</TableCell>
                  <TableCell>{requestor.trade_ccy}</TableCell>
                  <TableCell>{requestor.country}</TableCell>
                  <TableCell>{requestor.department}</TableCell>
                  <TableCell>{requestor.exchange_name}</TableCell>
                  <TableCell>
                    <ConfirmationDialog
                      title="Approve Request"
                      description="Are you sure you want to approve this request?"
                      requestor={requestor}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          {filteredRequestors?.length === 0 && (
            <div className="text-center text-gray-500 w-full mt-10">
              No results found for <strong>{searchTerm}</strong>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
