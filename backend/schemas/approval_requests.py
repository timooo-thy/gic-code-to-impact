from pydantic import BaseModel
from typing import Optional


class ApprovalRequestFormFromTrader(BaseModel):
    email: str
    instrument_name: str
    instrument_group: str
    trade_ccy: str
    settlement_ccy: str
    country: str
    exchange_name: str
    department: str


class CreateApprovalRequestResponseBody(BaseModel):
    id: int


class GetNonApprovedRequest(BaseModel):
    id: int
    email: str
    instrument_name: str
    instrument_group: str
    trade_ccy: str
    settlement_ccy: str
    country: str
    exchange_name: str
    department: str


class GetAllRequest(BaseModel):
    id: int
    email: str
    instrument_name: str
    instrument_group: str
    trade_ccy: str
    settlement_ccy: str
    country: str
    exchange_name: str
    department: str
    approved: bool


class ApprovalRequest(BaseModel):
    email: str
    password: str
