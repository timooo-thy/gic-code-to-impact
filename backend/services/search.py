from ..services.main import AppService, AppCRUD
from ..utils.service_result import ServiceResult
from ..models.instruments import InstrumentModel
from sqlalchemy import func

class SearchService(AppService):
    def search(self, instrument_group, instrument, department, risk_country, exchange, trade_ccy, settlement_ccy, limit=None, offset=None) -> ServiceResult:
        item = SearchCrud(self.db).search(instrument_group, instrument, department, risk_country, exchange, trade_ccy, settlement_ccy)
        return ServiceResult(item)
    
    def getList(self, field) -> ServiceResult:
        item = SearchCrud(self.db).getList(field)
        return ServiceResult(item)

class SearchCrud(AppCRUD):
    def search(self, instrument_group, instrument, department, risk_country, exchange, trade_ccy, settlement_ccy):
        query = None
        if instrument_group is not None:
            query = self.db.query(InstrumentModel).filter(InstrumentModel.instrument_group == instrument_group)
        elif instrument is not None:
            query = self.db.query(InstrumentModel).filter(func.similarity(InstrumentModel.instrument, instrument) > 0.3)
        elif department is not None:
            query = self.db.query(InstrumentModel).filter(InstrumentModel.department == department)
        elif risk_country is not None:
            query = self.db.query(InstrumentModel).filter(InstrumentModel.risk_country == risk_country)
        elif exchange is not None:
            query = self.db.query(InstrumentModel).filter(InstrumentModel.exchange == exchange)
        elif trade_ccy is not None:
            query = self.db.query(InstrumentModel).filter(InstrumentModel.trade_ccy == trade_ccy)
        elif settlement_ccy is not None:
            query = self.db.query(InstrumentModel).filter(InstrumentModel.settlement_ccy == settlement_ccy)
        if query:
            return query.all()
        return self.db.query(InstrumentModel).limit(50).all()
  
    def getList(self, field):
        return [getattr(x, field) for x in self.db.query(InstrumentModel).distinct(field).all()]

    def getCounterparties(self, instrument_group):
        return self.db.query(InstrumentModel).filter(InstrumentModel.instrument_group == instrument_group).all()
        