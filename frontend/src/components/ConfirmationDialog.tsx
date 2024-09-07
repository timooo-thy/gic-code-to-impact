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

type ConfirmationDialogProps = {
  title: string;
  description: string;
  buttonText: string;
  requestor: IncomingRequestType;
};

export function ConfirmationDialog({
  description,
  title,
  buttonText,
  requestor,
}: ConfirmationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{buttonText}</Button>
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
              value={requestor.user_email}
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
              value={requestor.currency}
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
          <Button type="submit">Approve</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
