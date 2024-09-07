"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

// Mock data for the trading instruments
const mockTradingInstruments = [
  { id: 1, name: "Apple Inc.", instrumentGroup: "Stocks", settlementCurrency: "USD", tradeCurrency: "USD", country: "USA", exchange: "NASDAQ" },
  { id: 2, name: "EUR/USD", instrumentGroup: "Forex", settlementCurrency: "USD", tradeCurrency: "EUR", country: "Global", exchange: "Forex" },
  { id: 3, name: "Gold Futures", instrumentGroup: "Commodities", settlementCurrency: "USD", tradeCurrency: "USD", country: "Global", exchange: "CME" },
  { id: 4, name: "UK Gilt", instrumentGroup: "Bonds", settlementCurrency: "GBP", tradeCurrency: "GBP", country: "UK", exchange: "LSE" },
  { id: 5, name: "Bitcoin", instrumentGroup: "Cryptocurrencies", settlementCurrency: "USD", tradeCurrency: "BTC", country: "Global", exchange: "Binance" },
]

// Mock data for instrument groups
const instrumentGroups = ["Stocks", "Forex", "Commodities", "Bonds", "Cryptocurrencies"]

// Mock data for past trading history
const mockPastTrades = [
  { id: 1, name: "Apple Inc.", instrumentGroup: "Stocks", amount: 100, price: 150.25, date: "2023-06-01" },
  { id: 2, name: "EUR/USD", instrumentGroup: "Forex", amount: 10000, price: 1.1234, date: "2023-06-02" },
  { id: 3, name: "Gold Futures", instrumentGroup: "Commodities", amount: 5, price: 1800.50, date: "2023-06-03" },
]

// Mock data for submitted requests
const mockSubmittedRequests = [
  { id: 1, instrumentName: "Tesla Inc.", status: "Approved", date: "2023-06-04" },
  { id: 2, instrumentName: "JPY/USD", status: "Pending", date: "2023-06-05" },
  { id: 3, instrumentName: "Silver Futures", status: "Rejected", date: "2023-06-06" },
]

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    instrumentGroup: "",
    instrument: "",
    settlementCurrency: "",
    tradeCurrency: "",
    country: "",
    exchange: "",
  })

  const [filteredInstruments, setFilteredInstruments] = useState<typeof mockTradingInstruments>([])
  const [availableInstruments, setAvailableInstruments] = useState<string[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    if (searchParams.instrumentGroup) {
      const instruments = mockTradingInstruments
        .filter(i => i.instrumentGroup === searchParams.instrumentGroup)
        .map(i => i.name)
      setAvailableInstruments(instruments)
    } else {
      setAvailableInstruments([])
    }
  }, [searchParams.instrumentGroup])

  const handleSearch = () => {
    const filtered = mockTradingInstruments.filter((instrument) => {
      return (
        (searchParams.instrumentGroup === "" || instrument.instrumentGroup === searchParams.instrumentGroup) &&
        (searchParams.instrument === "" || instrument.name === searchParams.instrument) &&
        (searchParams.settlementCurrency === "" || instrument.settlementCurrency.toLowerCase().includes(searchParams.settlementCurrency.toLowerCase())) &&
        (searchParams.tradeCurrency === "" || instrument.tradeCurrency.toLowerCase().includes(searchParams.tradeCurrency.toLowerCase())) &&
        (searchParams.country === "" || instrument.country.toLowerCase().includes(searchParams.country.toLowerCase())) &&
        (searchParams.exchange === "" || instrument.exchange.toLowerCase().includes(searchParams.exchange.toLowerCase()))
      )
    })
    setFilteredInstruments(filtered)
    setHasSearched(true)
  }

  const handleTrade = (instrumentId: number) => {
    // Implement trade logic here
    console.log(`Trading instrument with ID: ${instrumentId}`)
  }

  const handleSubmitNewRequest = () => {
    // Implement submit new request logic here
    console.log("Submitting new request to approval team")
  }

  const handleBack = () => {
    setHasSearched(false)
    setFilteredInstruments([])
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Approved Instruments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label htmlFor="instrumentGroup" className="text-sm font-medium">Instrument Group</label>
              <Select
                onValueChange={(value) => setSearchParams({ ...searchParams, instrumentGroup: value, instrument: "" })}
              >
                <SelectTrigger id="instrumentGroup">
                  <SelectValue placeholder="Select Instrument Group" />
                </SelectTrigger>
                <SelectContent>
                  {instrumentGroups.map((group) => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="instrument" className="text-sm font-medium">Instrument</label>
              <Select
                onValueChange={(value) => setSearchParams({ ...searchParams, instrument: value })}
                disabled={!searchParams.instrumentGroup}
              >
                <SelectTrigger id="instrument">
                  <SelectValue placeholder="Select Instrument" />
                </SelectTrigger>
                <SelectContent>
                  {availableInstruments.map((instrument) => (
                    <SelectItem key={instrument} value={instrument}>{instrument}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="settlementCurrency" className="text-sm font-medium">Settlement Currency</label>
              <Input
                id="settlementCurrency"
                placeholder="Settlement Currency"
                value={searchParams.settlementCurrency}
                onChange={(e) => setSearchParams({ ...searchParams, settlementCurrency: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="tradeCurrency" className="text-sm font-medium">Trade Currency</label>
              <Input
                id="tradeCurrency"
                placeholder="Trade Currency"
                value={searchParams.tradeCurrency}
                onChange={(e) => setSearchParams({ ...searchParams, tradeCurrency: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium">Country</label>
              <Input
                id="country"
                placeholder="Country"
                value={searchParams.country}
                onChange={(e) => setSearchParams({ ...searchParams, country: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="exchange" className="text-sm font-medium">Exchange</label>
              <Input
                id="exchange"
                placeholder="Exchange"
                value={searchParams.exchange}
                onChange={(e) => setSearchParams({ ...searchParams, exchange: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full">Search</Button>
        </CardContent>
      </Card>

      {hasSearched ? (
        <>
          <Button onClick={handleBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstruments.length > 0 ? (
              filteredInstruments.map((instrument) => (
                <Card key={instrument.id}>
                  <CardHeader>
                    <CardTitle>{instrument.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Instrument Group:</strong> {instrument.instrumentGroup}</p>
                    <p><strong>Settlement Currency:</strong> {instrument.settlementCurrency}</p>
                    <p><strong>Trade Currency:</strong> {instrument.tradeCurrency}</p>
                    <p><strong>Country:</strong> {instrument.country}</p>
                    <p><strong>Exchange:</strong> {instrument.exchange}</p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleTrade(instrument.id)} className="w-full">Trade</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>No Results Found</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We couldn't find any instruments matching your search criteria.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSubmitNewRequest} variant="outline" className="w-full">
                    Submit New Request to Approval Team
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
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
                    <p><strong>Instrument Group:</strong> {trade.instrumentGroup}</p>
                    <p><strong>Amount:</strong> {trade.amount}</p>
                    <p><strong>Price:</strong> {trade.price}</p>
                    <p><strong>Date:</strong> {trade.date}</p>
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
                    <p><strong>Status:</strong> {request.status}</p>
                    <p><strong>Date:</strong> {request.date}</p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}