from ..services.main import AppService, AppCRUD
from ..utils.service_result import ServiceResult
from ..models.instruments import InstrumentModel
from ..models.limits import LimitModel
from sqlalchemy import func

class SearchService(AppService):
    def search(self, instrument_group, instrument, department, risk_country, exchange, trade_ccy, settlement_ccy, limit, offset) -> ServiceResult:
        item = SearchCrud(self.db).search(instrument_group, instrument, department, risk_country, exchange, trade_ccy, settlement_ccy, limit, offset)
        return ServiceResult(item)
    
    def getList(self, field) -> ServiceResult:
        item = SearchCrud(self.db).getList(field)
        return ServiceResult(item)
    
    def getCounterparties(self, instrument_group) -> ServiceResult:
        item = SearchCrud(self.db).getCounterparties(instrument_group)
        return ServiceResult(item)

class SearchCrud(AppCRUD):
    def search(self, instrument_group, instrument, department, risk_country, exchange, trade_ccy, settlement_ccy, limit, offset):
        query = None
        if instrument_group is not None:
            query = self.db.query(InstrumentModel).filter(InstrumentModel.instrument_group == instrument_group)
        if instrument is not None:
            if query:
              query = query.filter(func.similarity(InstrumentModel.instrument, instrument) > 0.3)
            else:
              query = self.db.query(InstrumentModel).filter(func.similarity(InstrumentModel.instrument, instrument) > 0.3)
        if department is not None:
            if query:
                query = query.filter(InstrumentModel.department == department)
            else:
                query = self.db.query(InstrumentModel).filter(InstrumentModel.department == department)
        if risk_country is not None:
            if query:
                query = query.filter(InstrumentModel.risk_country == risk_country)
            else:
              query = self.db.query(InstrumentModel).filter(InstrumentModel.risk_country == risk_country)
        if exchange is not None:
            if query:
                query = query.filter(InstrumentModel.exchange == exchange)
            else:
              query = self.db.query(InstrumentModel).filter(InstrumentModel.exchange == exchange)
        if trade_ccy is not None:
            if query:
                query = query.filter(InstrumentModel.trade_ccy == trade_ccy)
            else:
              query = self.db.query(InstrumentModel).filter(InstrumentModel.trade_ccy == trade_ccy)
        if settlement_ccy is not None:
            if query:
                query = query.filter(InstrumentModel.settlement_ccy == settlement_ccy)
            else:
                query = self.db.query(InstrumentModel).filter(InstrumentModel.settlement_ccy == settlement_ccy)
        if query:
            return query.limit(limit).offset(offset).all()
        return self.db.query(InstrumentModel).limit(limit).offset(offset).all()
  
    def getList(self, field):
        return [getattr(x, field) for x in self.db.query(InstrumentModel).distinct(field).all()]

    def getCounterparties(self, instrument_group):
        return self.db.query(LimitModel).filter(LimitModel.instrument_group == instrument_group).all()
        