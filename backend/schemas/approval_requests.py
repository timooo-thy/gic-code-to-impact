from pydantic import BaseModel
from typing import Optional


class ApprovalRequestFormFromTrader(BaseModel):
    email: str
    instrument_name: str
    settlement_ccy: str
    trading_ccy: str
    country: str
    exchange_name: str
    department: str


class CreateApprovalRequestResponseBody(BaseModel):
    id: int


class GetNonApprovedRequest(BaseModel):
    email: str
    instrument_name: str
    currency: str
    country: str
    exchange_name: str
    department: str


class GetAllRequest(BaseModel):
    email: str
    instrument_name: str
    currency: str
    country: str
    exchange_name: str
    department: str
    approved: bool


class ApprovalRequest(BaseModel):
    email: str
    password: str
