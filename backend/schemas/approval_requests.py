from pydantic import BaseModel
from typing import Optional


class ApprovalRequestFormFromTrader(BaseModel):
    instrument_name: str
    currency: str
    country: str
    exchange_name: str
    department: str

class CreateApprovalRequestResponseBody(BaseModel):
    id: int


class ApprovalRequest(BaseModel):
    email: str
    password: str
