from ..services.main import AppService, AppCRUD
from ..utils.service_result import ServiceResult
from ..models.trades import TradeModel
from ..models.limits import LimitModel
from datetime import datetime


class TradeService(AppService):
    def getTrades(self, trader_id) -> ServiceResult:
        item = TradeCrud(self.db).getTrades(trader_id)
        return ServiceResult(item)

    def setTrade(self, item) -> ServiceResult:
        available = self.db.query(LimitModel).filter(LimitModel.instrument_group == item.instrument_group,
                                         LimitModel.counterparty == item.counterparty).first()
        if not available:
            return ServiceResult({"error": "No counterparty and instrument group"})
        if item.amount <= available.available_limit:
            available.available_limit -= item.amount
            self.db.commit()
            item = TradeCrud(self.db).setTrade(item)
            return ServiceResult(item)
        else:
            return ServiceResult({"error": "Amount is bigger than available"})



class TradeCrud(AppCRUD):
    def getTrades(self, trader_id):
        return self.db.query(TradeModel).filter(TradeModel.trader_id == trader_id).all()

    def setTrade(self, item):
        item = TradeModel(
            trader_id=item.trader_id,
            instrument=item.instrument,
            trade_ccy=item.trade_ccy,
            department=item.department,
            exchange=item.exchange,
            settlement_ccy=item.settlement_ccy,
            counterparty=item.counterparty,
            trade_date=datetime.now(),
            risk_country=item.risk_country,
            amount=item.amount,
            instrument_group=item.instrument_group
        )
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item
