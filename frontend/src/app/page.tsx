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

// Mock data for the trading instruments
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

  // export interface ApprovalRequestPayload {
  //   email: string;
  //   instrument_name: string;
  //   currency: string;
  //   country: string;
  //   exchange_name: string;
  //   department: string;
  // }

  const approvalRequestMutation = useCreateApprovalRequestMutation();

  const submitApprovalRequest = () => {
    approvalRequestMutation.mutate({
      email: "timothylhy@gic.com",
      settlement_ccy: "AED",
      trade_ccy: "AED",
      country: "ARGENTINA",
      exchange_name: "Abu Dhabi",
      department: "RE",
      instrument_group: "Bonds",
      instrument_name: "0% Convertible Bonds",
    });
  };

  const [amount, setAmount] = useState(0);

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
  };

  const handleTrade = (instrumentId: number) => {
    // Implement trade logic here
    // const fetchTrade = async () => {
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_FASTAPI_URL}/trade/${instrumentId}`
    //   );
    //   const data = await response.json();
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

    console.log(`Trading instrument with ID: ${instrumentId}`);
  };

  const handleSubmitNewRequest = () => {
    // Implement submit new request logic here
    console.log("Submitting new request to approval team");
  };

  const handleBack = () => {
    setHasSearched(false);
    setFilteredInstruments([]);
  };

  const [open, setOpen] = useState(false);
  const [settlementOpen, setSettlementOpen] = useState(false);
  const [tradingoOpen, setTradingOpen] = useState(false);
  const [exchangeOpen, setExchangeOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  const [openCounterParty, setOpenCounterParty] = useState(false);

  const [value, setValue] = useState("");

  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [v3, setV3] = useState("");
  const [v4, setV4] = useState("");

  const [v5, setV5] = useState("");
  const [v5Open, setV5Open] = useState(false);

  const [v6, setV6] = useState("");
  const [v6Open, setV6Open] = useState(false);

  const [v7, setV7] = useState("");
  const [v7Open, setV7Open] = useState(false);

  const [v8, setV8] = useState("");
  const [v8Open, setV8Open] = useState(false);

  const [v9, setV9] = useState("");
  const [v9Open, setV9Open] = useState(false);

  const [v10, setV10] = useState("");
  const [v10Open, setV10Open] = useState(false);

  const [v11, setV11] = useState("");
  const [v11Open, setV11Open] = useState(false);

  // const { data1, isPending, isError } = useGetSearchData(
  //   "",
  //   value,
  //   "",
  //   v3,
  //   v4,
  //   v2,
  //   v1
  // );

  // console.log(data1);

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
    // TODO: loading

    return <div>Loading...</div>;
  }

  // useEffect(() => {
  //   setV5(value);
  //   setV6(v1);
  //   setV7(v2);
  //   setV8(v3);
  //   setV9(v4);
  // }, [hasSearched, v1, v2, v3, v4]);

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

            <div className="space-y-2 flex flex-col">
              <label htmlFor="instrument" className="text-sm font-medium">
                Instrument
              </label>
              {/* <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {value
                      ? instrumentsFormData.find(
                          (framework) => framework.value === value
                        )?.label
                      : "Select Instrument..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[380px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Instrument..." />
                    <CommandList>
                      <CommandEmpty>No instrument found.</CommandEmpty>
                      <CommandGroup>
                        {instrumentsFormData.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue == value ? "" : currentValue
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
              </Popover> */}
              <CreatableSelect
                isClearable
                options={instrumentsFormData}
                onInputChange={(val: string) => {
                  setValue(val);
                }}
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="settlement" className="text-sm font-medium">
                Settlement
              </label>
              {/* <Popover open={settlementOpen} onOpenChange={setSettlementOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {v1
                      ? settlementFormData.find(
                          (framework) => framework.value === v1
                        )?.label
                      : "Select Settlement..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[380px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Settlement..." />
                    <CommandList>
                      <CommandEmpty>No Settlement found.</CommandEmpty>
                      <CommandGroup>
                        {settlementFormData.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setV1(currentValue == v1 ? "" : currentValue);
                              setSettlementOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                v1 === framework.value
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
              </Popover> */}
              <CreatableSelect
                isClearable
                options={settlementFormData}
                onInputSelect={(val) => {
                  setValue(val);
                }}
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="settlement" className="text-sm font-medium">
                Trading
              </label>
              {/* <Popover open={tradingoOpen} onOpenChange={setTradingOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {v2
                      ? tradingFormData.find(
                          (framework) => framework.value === v2
                        )?.label
                      : "Select Trading..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[380px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Trading..." />
                    <CommandList>
                      <CommandEmpty>No Trading found.</CommandEmpty>
                      <CommandGroup>
                        {tradingFormData.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setV2(currentValue == v2 ? "" : currentValue);
                              setTradingOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                v2 === framework.value
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
              </Popover> */}
              <CreatableSelect
                isClearable
                options={tradingFormData}
                onInputSelect={(val) => {
                  setValue(val);
                }}
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="settlement" className="text-sm font-medium">
                Country
              </label>
              {/* <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {v3
                      ? countryFormData.find(
                          (framework) => framework.value === v3
                        )?.label
                      : "Select Country..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[380px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Country..." />
                    <CommandList>
                      <CommandEmpty>No Trading found.</CommandEmpty>
                      <CommandGroup>
                        {countryFormData.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setV3(currentValue == v3 ? "" : currentValue);
                              setCountryOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                v3 === framework.value
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
              </Popover> */}
              <CreatableSelect
                isClearable
                options={countryFormData}
                onInputSelect={(val) => {
                  setValue(val);
                }}
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="settlement" className="text-sm font-medium">
                Exchange
              </label>
              {/* <Popover open={exchangeOpen} onOpenChange={setExchangeOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {v4
                      ? exchangeFormData.find(
                          (framework) => framework.value === v4
                        )?.label
                      : "Select Exchange..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[380px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Exchange..." />
                    <CommandList>
                      <CommandEmpty>No Exchange found.</CommandEmpty>
                      <CommandGroup>
                        {exchangeFormData.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setV4(currentValue == v4 ? "" : currentValue);
                              setExchangeOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                v4 === framework.value
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
              </Popover> */}
              <CreatableSelect
                isClearable
                options={exchangeFormData}
                onInputSelect={(val) => {
                  setValue(val);
                }}
              />
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full">
            Search
          </Button>
        </CardContent>
      </Card>

      {hasSearched ? (
        <>
          {/* <Button onClick={handleBack} className='mb-4'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Back to Dashboard
          </Button> */}
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
                      <strong>Trade Currency:</strong>{" "}
                      {instrument.tradeCurrency}
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
                              <CommandEmpty>
                                No CounterParty found.
                              </CommandEmpty>
                              <CommandGroup>
                                {frameworks.map((framework) => (
                                  <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
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
                    <Button
                      onClick={() => handleTrade(instrument.id)}
                      className="w-full"
                    >
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
                      <label
                        htmlFor="instrument"
                        className="text-sm font-medium"
                      >
                        Instrument
                      </label>
                      <CreatableSelect
                        defaultInputValue={v1}
                        isClearable
                        options={instrumentsFormData}
                        onInputChange={(value: string) => {
                          setV5(value);
                        }}
                      />
                      {/* <Popover open={v5Open} onOpenChange={setV5Open}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {value
                              ? instrumentsFormData.find(
                                  (framework) => framework.value === value
                                )?.label
                              : "Select Instrument..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[380px] p-0">
                          <Command>
                            <CommandInput placeholder="Search Instrument..." />
                            <CommandList>
                              <CommandEmpty>No instrument found.</CommandEmpty>
                              <CommandGroup>
                                {instrumentsFormData.map((framework) => (
                                  <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                      setV5(
                                        currentValue == v5 ? "" : currentValue
                                      );
                                      setV5Open(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        v5 === framework.value
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
                      </Popover> */}
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <label
                        htmlFor="settlement"
                        className="text-sm font-medium"
                      >
                        Settlement
                      </label>
                      <CreatableSelect
                        isClearable
                        options={settlementFormData}
                        onInputChange={(value) => {
                          console.log("value", value);
                          setV6(value);
                        }}
                      />
                      {/* <Popover open={v6Open} onOpenChange={setV6Open}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {v6
                              ? settlementFormData.find(
                                  framework => framework.value === v6
                                )?.label
                              : "Select Settlement..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[380px] p-0">
                          <Command>
                            <CommandInput placeholder="Search Settlement..." />
                            <CommandList>
                              <CommandEmpty>No Settlement found.</CommandEmpty>
                              <CommandGroup>
                                {settlementFormData.map((framework) => (
                                  <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                      setV6(
                                        currentValue == v6 ? "" : currentValue
                                      );
                                      setV6Open(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        v6 === framework.value
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
                      </Popover> */}
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <label
                        htmlFor="settlement"
                        className="text-sm font-medium"
                      >
                        Trading
                      </label>
                      <CreatableSelect
                        isClearable
                        options={tradingFormData}
                        onInputChange={(value) => {
                          setV7(value);
                        }}
                      />
                      {/* <Popover open={v7Open} onOpenChange={setV7Open}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {v7
                              ? tradingFormData.find(
                                  framework => framework.value === v7
                                )?.label
                              : "Select Trading..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[380px] p-0">
                          <Command>
                            <CommandInput placeholder="Search Trading..." />
                            <CommandList>
                              <CommandEmpty>No Trading found.</CommandEmpty>
                              <CommandGroup>
                                {tradingFormData.map((framework) => (
                                  <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                      setV7(
                                        currentValue == v7 ? "" : currentValue
                                      );
                                      setV7Open(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        v7 === framework.value
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
                      </Popover> */}
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <label
                        htmlFor="settlement"
                        className="text-sm font-medium"
                      >
                        Country
                      </label>
                      <CreatableSelect
                        isClearable
                        options={countryFormData}
                        onInputChange={(value) => {
                          setV8(value);
                        }}
                      />
                      {/* <Popover open={v8Open} onOpenChange={setV8Open}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {v8
                              ? countryFormData.find(
                                  framework => framework.value === v8
                                )?.label
                              : "Select Country..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[380px] p-0">
                          <Command>
                            <CommandInput placeholder="Search Country..." />
                            <CommandList>
                              <CommandEmpty>No Trading found.</CommandEmpty>
                              <CommandGroup>
                                {countryFormData.map((framework) => (
                                  <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                      setV8(
                                        currentValue == v8 ? "" : currentValue
                                      );
                                      setV8Open(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        v8 === framework.value
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
                      </Popover> */}
                    </div>

                    <div className="space-y-2 flex flex-col">
                      <label
                        htmlFor="settlement"
                        className="text-sm font-medium"
                      >
                        Exchange
                      </label>
                      <CreatableSelect
                        isClearable
                        options={exchangeFormData}
                        onInputChange={(value) => {
                          setV9(value);
                        }}
                      />
                      {/* <Popover open={v9Open} onOpenChange={setV9Open}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {v9
                              ? exchangeFormData.find(
                                  framework => framework.value === v9
                                )?.label
                              : "Select Exchange..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[380px] p-0">
                          <Command>
                            <CommandInput placeholder="Search Exchange..." />
                            <CommandList>
                              <CommandEmpty>No Exchange found.</CommandEmpty>
                              <CommandGroup>
                                {exchangeFormData.map((framework) => (
                                  <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                      setV9(
                                        currentValue == v9 ? "" : currentValue
                                      );
                                      setV9Open(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        v9 === framework.value
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
                      </Popover> */}
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
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <Card>
            <CardHeader>
              <CardTitle>Past Trading History</CardTitle>
            </CardHeader>
            <CardContent>
              {mockPastTrades.map((trade) => (
                <Card key={trade.id} className="mb-4">
                  <CardHeader>
                    <CardTitle>{trade.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>Instrument Group:</strong> {trade.instrumentGroup}
                    </p>
                    <p>
                      <strong>Amount:</strong> {trade.amount}
                    </p>
                    <p>
                      <strong>Price:</strong> {trade.price}
                    </p>
                    <p>
                      <strong>Date:</strong> {trade.date}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Submitted Requests Status</CardTitle>
            </CardHeader>
            <CardContent>
              {mockSubmittedRequests.map((request) => (
                <Card key={request.id} className="mb-4">
                  <CardHeader>
                    <CardTitle>{request.instrumentName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>Status:</strong> {request.status}
                    </p>
                    <p>
                      <strong>Date:</strong> {request.date}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card> */}
        </div>
      )}
    </div>
  );
}
