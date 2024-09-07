from datetime import datetime

from sqlalchemy import Column, String, Boolean, Integer, UniqueConstraint, Time, ForeignKey
from sqlalchemy.orm import relationship

from .users import UserModel
from ..config.database import Base

class ApprovalRequestModel(Base):
    __tablename__ = "requests"
    id = Column(Integer, autoincrement=True)
    email = Column(String, primary_key=True)
    created_at = Column(Time, default=datetime.utcnow)
    instrument_name = Column(String)
    currency = Column(String)
    country = Column(String)
    exchange_name = Column(String)
    department = Column(String)
    approved = Column(Boolean)
    approved_by_user_id = Column(Integer, ForeignKey(UserModel.id), nullable=True)

    approved_by_user = relationship('UserModel', foreign_keys=[approved_by_user_id])

