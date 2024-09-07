from pydantic import BaseModel


class LimitGroupResponse(BaseModel):
    instrument_group: str
    available_limit: int