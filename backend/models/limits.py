from sqlalchemy import Column, String, Integer, DateTime
from ..config.database import Base


class LimitModel(Base):
    __tablename__ = "available_limits"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    instrument_group = Column(String)
    counterparty = Column(String)
    currency = Column(String)
    available_limit = Column(int)
    data_date = Column(DateTime)
