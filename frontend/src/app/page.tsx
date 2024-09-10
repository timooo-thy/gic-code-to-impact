"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import CreatableSelect from "react-select/creatable";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ArrowLeft, ListRestartIcon } from "lucide-react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useCreateApprovalRequestMutation,
  useGetInstruments,
  useGetSearchData,
  useModifyTrade,
} from "@/hooks/home";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { frameworks } from "@/lib/constants";

const mockTradingInstruments = [
  {
    id: 1,
    name: "Apple Inc.",
    instrumentGroup: "Stocks",
    settlementCurrency: "USD",
    tradeCurrency: "USD",
    country: "USA",
    exchange: "NASDAQ",
  },
  {
    id: 2,
    name: "EUR/USD",
    instrumentGroup: "Forex",
    settlementCurrency: "USD",
    tradeCurrency: "EUR",
    country: "Global",
    exchange: "Forex",
  },
  {
    id: 3,
    name: "Gold Futures",
    instrumentGroup: "Commodities",
    settlementCurrency: "USD",
    tradeCurrency: "USD",
    country: "Global",
    exchange: "CME",
  },
  {
    id: 4,
    name: "0% Convertible Bonds",
    instrumentGroup: "Bonds",
    settlementCurrency: "SGD",
    tradeCurrency: "NGN",
    country: "JAPAN",
    exchange: "MESDAQ",
  },
  {
    id: 5,
    name: "Bitcoin",
    instrumentGroup: "Cryptocurrencies",
    settlementCurrency: "USD",
    tradeCurrency: "BTC",
    country: "Global",
    exchange: "Binance",
  },
];

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    instrumentGroup: "",
    instrument: "",
    settlementCurrency: "",
    tradeCurrency: "",
    country: "",
    exchange: "",
  });

  const [filteredInstruments, setFilteredInstruments] = useState<
    typeof mockTradingInstruments
  >([]);
  const [availableInstruments, setAvailableInstruments] = useState<string[]>(
    []
  );
  const [hasSearched, setHasSearched] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (searchParams.instrumentGroup) {
      const instruments = mockTradingInstruments
        .filter((i) => i.instrumentGroup === searchParams.instrumentGroup)
        .map((i) => i.name);
      setAvailableInstruments(instruments);
    } else {
      setAvailableInstruments([]);
    }
  }, [searchParams.instrumentGroup]);

  const approvalRequestMutation = useCreateApprovalRequestMutation();

  const submitApprovalRequest = () => {
    approvalRequestMutation.mutate({
      email: "timothylhy@gic.com",
      settlement_ccy: "AED",
      trade_ccy: "AED",
      country: "ARGENTINA",
      exchange_name: "Abu Dhabi",
      department: "RE",
      instrument_group: "Cash",
      instrument_name: "Cash",
    });
  };

  const mutation = useModifyTrade();

  const handleSearch = () => {
    const filtered = mockTradingInstruments.filter((instrument) => {
      return (
        (searchParams.instrumentGroup === "" ||
          instrument.instrumentGroup === searchParams.instrumentGroup) &&
        (searchParams.instrument === "" ||
          instrument.name === searchParams.instrument) &&
        (searchParams.settlementCurrency === "" ||
          instrument.settlementCurrency
            .toLowerCase()
            .includes(searchParams.settlementCurrency.toLowerCase())) &&
        (searchParams.tradeCurrency === "" ||
          instrument.tradeCurrency
            .toLowerCase()
            .includes(searchParams.tradeCurrency.toLowerCase())) &&
        (searchParams.country === "" ||
          instrument.country
            .toLowerCase()
            .includes(searchParams.country.toLowerCase())) &&
        (searchParams.exchange === "" ||
          instrument.exchange
            .toLowerCase()
            .includes(searchParams.exchange.toLowerCase()))
      );
    });

    setFilteredInstruments(filtered);
    setHasSearched(true);

    setV5(value);
  };

  const handleTrade = () => {
    mutation.mutate({
      trader_id: 30,
      instrument: "0% Convertible Bonds",
      instrument_group: "Bonds",
      trade_ccy: "NGN",
      settlement_ccy: "SGD",
      risk_country: "JAPAN",
      exchange: "MESDAQ",
      department: "RE",
      amount: amount,
      counterparty: "Barclays Bank PLC",
      trade_date: new Date().toISOString(),
    });

    toast.success("Trade has been executed successfully!");
  };

  const [open, setOpen] = useState(false);

  const [openCounterParty, setOpenCounterParty] = useState(false);

  const [value, setValue] = useState("");

  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [v3, setV3] = useState("");
  const [v4, setV4] = useState("");
  const [v5, setV5] = useState("");
  const [v6, setV6] = useState("");
  const [v7, setV7] = useState("");
  const [v8, setV8] = useState("");
  const [v9, setV9] = useState("");
  const [v10, setV10] = useState("");
  const [v11, setV11] = useState("");

  const {
    data: searchData,
    isPending: isSearchDataPending,
    isError: isSearchDataError,
  } = useGetSearchData("", value, "", v3, v4, v2, v1);

  const {
    data: instrumentGroup,
    isPending: isInstrumentGroupPending,
    isError: isInstrumentGroupError,
  } = useGetInstruments("instrument_group");
  const {
    data: instruments,
    isPending: isInstrumentsPending,
    isError: isInstrumentsError,
  } = useGetInstruments("instrument");
  const {
    data: riskCountry,
    isPending: isRiskCountryPending,
    isError: isRiskCountryError,
  } = useGetInstruments("risk_country");
  const {
    data: exchange,
    isPending: isExchangePending,
    isError: isExchangeError,
  } = useGetInstruments("exchange");
  const {
    data: tradeCcy,
    isPending: isTradeCcyPending,
    isError: isTradeCcyError,
  } = useGetInstruments("trade_ccy");
  const {
    data: settlementCcy,
    isPending: isSettlementCcyPending,
    isError: isSettlementCcyError,
  } = useGetInstruments("settlement_ccy");

  if (
    isInstrumentGroupPending ||
    isInstrumentsPending ||
    isRiskCountryPending ||
    isExchangePending ||
    isTradeCcyPending ||
    isSettlementCcyPending ||
    isInstrumentGroupError ||
    isInstrumentsError ||
    isRiskCountryError ||
    isExchangeError ||
    isTradeCcyError ||
    isSettlementCcyError ||
    !instrumentGroup ||
    !instruments
  ) {
    return <div>Loading...</div>;
  }

  const instrumentsFormData: KeyValuePair[] = instruments.map(
    (item: string) => ({
      label: item,
      value: item,
    })
  );

  const settlementFormData: KeyValuePair[] = settlementCcy.map(
    (item: string) => ({
      label: item,
      value: item,
    })
  );

  const tradingFormData: KeyValuePair[] = tradeCcy.map((item: string) => ({
    label: item,
    value: item,
  }));

  const countryFormData: KeyValuePair[] = riskCountry.map((item: string) => ({
    label: item,
    value: item,
  }));

  const exchangeFormData: KeyValuePair[] = exchange.map((item: string) => ({
    label: item,
    value: item,
  }));

  return (
    <div className="container mx-auto p-6">
      <Navbar />
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <p>Search Approved Instruments</p>
              <ListRestartIcon
                className="cursor-pointer"
                onClick={() => {
                  setValue("");
                  setV1("");
                  setV2("");
                  setV3("");
                  setV4("");
                  setV5("");
                }}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label htmlFor="instrumentGroup" className="text-sm font-medium">
                Instrument Group
              </label>
              <Select
                value={v11}
                onValueChange={(value) => {
                  setV11(value);
                  setSearchParams({
                    ...searchParams,
                    instrumentGroup: value,
                    instrument: "",
                  });
                }}
              >
                <SelectTrigger id="instrumentGroup">
                  <SelectValue placeholder="Select Instrument Group" />
                </SelectTrigger>
                <SelectContent>
                  {instrumentGroup.map((group: string) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="instrument" className="text-sm font-medium">
                Instrument
              </label>
              <CreatableSelect
                isClearable
                options={instrumentsFormData}
                onInputChange={(val: string) => {
                  setValue(val);
                }}
                onChange={(val) => {
                  setV10(val?.value ?? "");
                }}
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="settlement" className="text-sm font-medium">
                Settlement
              </label>
              <CreatableSelect
                isClearable
                options={settlementFormData}
                onChange={(val) => {
                  setV1(val?.value ?? "");
                }}
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="settlement" className="text-sm font-medium">
                Trading
              </label>
              <CreatableSelect
                isClearable
                options={tradingFormData}
                onChange={(val) => {
                  setV2(val?.value ?? "");
                }}
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="settlement" className="text-sm font-medium">
                Country
              </label>
              <CreatableSelect
                isClearable
                options={countryFormData}
                onChange={(val) => {
                  setV3(val?.value ?? "");
                }}
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="settlement" className="text-sm font-medium">
                Exchange
              </label>
              <CreatableSelect
                isClearable
                options={exchangeFormData}
                onChange={(val) => {
                  setV4(val?.value ?? "");
                }}
              />
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full">
            Search
          </Button>
        </CardContent>
      </Card>

      {hasSearched && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstruments.length > 0 ? (
            filteredInstruments.map((instrument) => (
              <Card key={instrument.id}>
                <CardHeader>
                  <CardTitle>{instrument.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Instrument Group:</strong>{" "}
                    {instrument.instrumentGroup}
                  </p>
                  <p>
                    <strong>Settlement Currency:</strong>{" "}
                    {instrument.settlementCurrency}
                  </p>
                  <p>
                    <strong>Trade Currency:</strong> {instrument.tradeCurrency}
                  </p>
                  <p>
                    <strong>Country:</strong> {instrument.country}
                  </p>
                  <p>
                    <strong>Exchange:</strong> {instrument.exchange}
                  </p>
                  <div className="space-y-2 flex flex-col">
                    <p>
                      <strong>CounterParty: </strong>
                    </p>
                    <Popover
                      open={openCounterParty}
                      onOpenChange={setOpenCounterParty}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCounterParty}
                          className="w-full justify-between"
                        >
                          {value
                            ? frameworks.find(
                                (framework) => framework.value === value
                              )?.label
                            : "Select CounterParty..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[380px] p-0">
                        <Command>
                          <CommandInput placeholder="Search CounterParty..." />
                          <CommandList>
                            <CommandEmpty>No CounterParty found.</CommandEmpty>
                            <CommandGroup>
                              {frameworks.map((framework) => (
                                <CommandItem
                                  key={framework.value}
                                  value={framework.value}
                                  onSelect={(currentValue) => {
                                    setValue(
                                      currentValue === value ? "" : currentValue
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      value === framework.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {framework.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardContent>
                <CardFooter>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(parseInt(e.target.value));
                    }}
                  />
                  <Button onClick={() => handleTrade()} className="w-full">
                    Trade
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Submit Approval Request</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="instrumentGroup"
                      className="text-sm font-medium"
                    >
                      Instrument Group
                    </label>
                    <Select
                      value={v11}
                      onValueChange={(value) =>
                        setSearchParams({
                          ...searchParams,
                          instrumentGroup: value,
                          instrument: "",
                        })
                      }
                    >
                      <SelectTrigger id="instrumentGroup">
                        <SelectValue placeholder="Select Instrument Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {instrumentGroup.map((group: string) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* THIS IS V5...... */}
                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="instrument" className="text-sm font-medium">
                      Instrument
                    </label>
                    <CreatableSelect
                      inputValue={v10}
                      isClearable
                      options={instrumentsFormData}
                    />
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="settlement" className="text-sm font-medium">
                      Settlement
                    </label>
                    <CreatableSelect
                      inputValue={v1}
                      isClearable
                      options={settlementFormData}
                      onInputChange={(value) => {
                        setV6(value);
                      }}
                    />
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="settlement" className="text-sm font-medium">
                      Trading
                    </label>
                    <CreatableSelect
                      inputValue={v2}
                      isClearable
                      options={tradingFormData}
                      onInputChange={(value) => {
                        setV7(value);
                      }}
                    />
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="settlement" className="text-sm font-medium">
                      Country
                    </label>
                    <CreatableSelect
                      inputValue={v3}
                      isClearable
                      options={countryFormData}
                      onInputChange={(value) => {
                        setV8(value);
                      }}
                    />
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="settlement" className="text-sm font-medium">
                      Exchange
                    </label>
                    <CreatableSelect
                      inputValue={v4}
                      isClearable
                      options={exchangeFormData}
                      onInputChange={(value) => {
                        setV9(value);
                      }}
                    />
                  </div>
                </div>
                <Button
                  onClick={() => {
                    submitApprovalRequest();
                    toast.success("Approval request submitted successfully!");
                  }}
                  className="w-full"
                >
                  Submit Approval Request
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
