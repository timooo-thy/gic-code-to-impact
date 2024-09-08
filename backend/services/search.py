from ..services.main import AppService, AppCRUD
from ..utils.service_result import ServiceResult
from ..models.instruments import InstrumentModel
from ..models.limits import LimitModel
from ..schemas.search import LimitGroupResponse
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

    def getSumOfLimits(self) -> ServiceResult:
        items = SearchCrud(self.db).getSumOfLimits()
        return ServiceResult([item.dict() for item in items])

class SearchCrud(AppCRUD):
    def search(self, instrument_group, instrument, department, risk_country, exchange, trade_ccy, settlement_ccy, limit, offset):
        query = None
        if instrument_group is not None and instrument_group != "":
            query = self.db.query(InstrumentModel).filter(InstrumentModel.instrument_group == instrument_group)
        if instrument is not None and instrument != "":
            if query:
              query = query.filter(func.similarity(InstrumentModel.instrument, instrument) > 0.3)
            else:
              query = self.db.query(InstrumentModel).filter(func.similarity(InstrumentModel.instrument, instrument) > 0.3)
        if department is not None and department != "":
            if query:
                query = query.filter(InstrumentModel.department == department)
            else:
                query = self.db.query(InstrumentModel).filter(InstrumentModel.department == department)
        if risk_country is not None and risk_country != "":
            if query:
                query = query.filter(InstrumentModel.risk_country == risk_country)
            else:
              query = self.db.query(InstrumentModel).filter(InstrumentModel.risk_country == risk_country)
        if exchange is not None and exchange != "":
            if query:
                query = query.filter(InstrumentModel.exchange == exchange)
            else:
              query = self.db.query(InstrumentModel).filter(InstrumentModel.exchange == exchange)
        if trade_ccy is not None and trade_ccy != "":
            if query:
                query = query.filter(InstrumentModel.trade_ccy == trade_ccy)
            else:
              query = self.db.query(InstrumentModel).filter(InstrumentModel.trade_ccy == trade_ccy)
        if settlement_ccy is not None and settlement_ccy != "":
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

    def getSumOfLimits(self):
        results = self.db.query(
            LimitModel.instrument_group,
            func.sum(LimitModel.available_limit).label('available_limit')
        ).group_by(LimitModel.instrument_group).all()
        limit_groups = []
        for result in results:
            limit_groups.append(LimitGroupResponse(instrument_group=result[0],
                                                   available_limit=int(result[1]) if result[1] is not None else 0))
        return limit_groups