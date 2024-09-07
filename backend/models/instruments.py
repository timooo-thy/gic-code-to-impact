from sqlalchemy import Column, String, Boolean, Integer, UniqueConstraint
from ..config.database import Base


class InstrumentModel(Base):
    __tablename__ = "approved_instruments"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    instrument_group = Column(String)
    instrument = Column(String)
    department = Column(String)
    risk_country = Column(String)
    exchange = Column(String)
    trade_ccy = Column(String)
    settlement_ccy = Column(String)
