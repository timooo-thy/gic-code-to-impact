import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IncomingRequestType } from "@/lib/types";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useState } from "react";

type ConfirmationDialogProps = {
  title: string;
  description: string;
  requestor: IncomingRequestType;
};

export function ConfirmationDialog({
  description,
  title,
  requestor,
}: ConfirmationDialogProps) {
  const [open, setOpen] = useState(false);
  const handleApprove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_FASTAPI_URL +
        `/approval-request/approve-request?req_id=${requestor.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      toast.error("Error approving request");
      setOpen(false);
      return;
    }

    toast.success(`Request has been approved for ${requestor.email}`);
    requestor.approved = true;
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={requestor.approved}
          className={`w-28 ${requestor.approved && "bg-green-700  border border-green-700/80 "}`}
        >
          {requestor.approved ? "Approved" : "Pending"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={requestor.email}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="department" className="text-right">
              Department
            </Label>
            <Input
              id="department"
              value={requestor.department}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="instrument" className="text-right">
              Instrument
            </Label>
            <Input
              id="instrument"
              value={requestor.instrument_name}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currency" className="text-right">
              Currency
            </Label>
            <Input
              id="currency"
              value={requestor.trade_ccy}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="country" className="text-right">
              Country
            </Label>
            <Input
              id="country"
              value={requestor.country}
              className="col-span-3"
              disabled
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="exchange" className="text-right">
              Exchange
            </Label>
            <Input
              id="exchange"
              value={requestor.exchange_name}
              className="col-span-3"
              disabled
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleApprove}>
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
