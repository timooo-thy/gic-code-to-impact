from sqlalchemy import Column, String, Integer, DateTime
from ..config.database import Base


class TradeModel(Base):
    __tablename__ = "trades"

    trade_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    trader_id = Column(Integer)
    instrument_group = Column(String)
    instrument = Column(String)
    department = Column(String)
    exchange = Column(String)
    trade_ccy = Column(String)
    settlement_ccy = Column(String)
    counterparty = Column(String)
    trade_date = Column(DateTime)
    risk_country = Column(String)
    amount = Column(Integer)
