import React, { SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign } from "lucide-react";
import { Button } from "./ui/button";

type DashboardCardProps = {
  title: string;
  amount: number;
  onClick: () => SetStateAction<void>;
};

export default function DashboardCard({
  title,
  amount,
  onClick,
}: DashboardCardProps) {
  return (
    <Card
      className="h-40 flex flex-col justify-between hover:bg-primary-foreground hover:text-primary-background cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold text-right">
          ${amount.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
