from pydantic import BaseModel
from datetime import datetime


class TradeRequest(BaseModel):
    trader_id: str
    instrument_group: str
    instrument: str
    department: str
    exchange: str
    trade_ccy: str
    settlement_ccy: str
    counterparty: str
    trade_date: datetime
    risk_country: str
    amount: int
