import React, { useState } from "react";
import Navbar from "./Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";

type IncomingRequestType = {
  id: string;
  instrument_name: string;
  currency: string;
  country: string;
  exchange_name: string;
  department: string;
};

export default function AdminDashboard() {
  const [incomingRequests, setIncomingRequests] = useState<
    IncomingRequestType[]
  >([]);

  return (
    <main className="flex min-h-screen w-4/5 flex-col m-auto">
      <Navbar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 max-h-[500px]">
          <LimitTable incomingRequests={incomingRequests} />
        </div>
      </main>
    </main>
  );
}

type LimitTableProps = {
  incomingRequests: IncomingRequestType[];
};

const LimitTable = ({ incomingRequests }: LimitTableProps) => {
  return (
    <Card className="col-span-full h-[500px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Incoming requests</CardTitle>
        <CardDescription>
          {/* All incoming requests {incomingRequests[0]?.instrument_group} */}
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
          {/* <TableBody>
            {incomingRequests.map((counterParty) => (
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
          </TableBody> */}
        </Table>
      </CardContent>
    </Card>
  );
};
