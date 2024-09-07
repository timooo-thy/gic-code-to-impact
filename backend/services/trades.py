from ..services.main import AppService, AppCRUD
from ..utils.service_result import ServiceResult
from ..models.trades import TradeModel

class TradeService(AppService):
    def getTrades(self, trader_id) -> ServiceResult:
        item = TradeCrud(self.db).getTrades(trader_id)
        return ServiceResult(item)

class TradeCrud(AppCRUD):
    def getTrades(self, trader_id):
        return self.db.query(TradeModel).filter(TradeModel.trader_id == trader_id).all()
