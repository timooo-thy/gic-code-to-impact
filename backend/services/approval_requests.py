import datetime

from ..models.approval_requests import ApprovalRequestModel
from ..models.instruments import InstrumentModel
from ..schemas.approval_requests import ApprovalRequestFormFromTrader, GetNonApprovedRequest, GetAllRequest
from ..services.main import AppService, AppCRUD
from ..utils.service_result import ServiceResult
from ..utils.credentials_misc import get_current_user
from ..utils.app_exceptions import AppException
from ..schemas.users import JWTToken
from sqlalchemy import desc

class ApprovalRequestService(AppService):
    def createApprovalRequestFormFromTrader(self, item: ApprovalRequestFormFromTrader) -> ServiceResult:
        item = ApprovalRequestCRUD(self.db).createApprovalRequestFormFromTrader(item)
        if not item:
            return ServiceResult(AppException.AddItem({"error": "Failed"}))
        return ServiceResult(item)

    def getApprovalRequests(self) -> ServiceResult:
        item = ApprovalRequestCRUD(self.db).getApprovalRequests()
        return ServiceResult(item)

    def getAllRequests(self) -> ServiceResult:
        item = ApprovalRequestCRUD(self.db).getAllRequests()
        return ServiceResult(item)

    def approveRequest(self, id: int) -> ServiceResult:
        item = ApprovalRequestCRUD(self.db).approveRequest(id)
        if not item:
            return ServiceResult(AppException.InvalidItem({"error": "Failed"}))
        return ServiceResult(item)

    def getUserRequests(self, user: JWTToken) -> ServiceResult:
        item = ApprovalRequestCRUD(self.db).getUserRequests(user)
        return ServiceResult(item)


class ApprovalRequestCRUD(AppCRUD):
    def createApprovalRequestFormFromTrader(self, item: ApprovalRequestFormFromTrader) -> ApprovalRequestModel:
        item = ApprovalRequestModel(
            email = item.email,
            created_at = datetime.datetime.now(),
            instrument_name = item.instrument_name,
            settlement_ccy = item.settlement_ccy,
            trade_ccy = item.trade_ccy,
            country = item.country,
            exchange_name = item.exchange_name,
            department = item.department,
            approved=False,
            approved_by_user_id=None,
            instrument_group = item.instrument_group,
        )
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item

    def getApprovalRequests(self) -> list[GetNonApprovedRequest]:
        item = self.db.query(ApprovalRequestModel).filter(ApprovalRequestModel.approved == False).all()
        return item

    def getAllRequests(self) -> list[GetAllRequest]:
        item = self.db.query(ApprovalRequestModel).order_by(desc(ApprovalRequestModel.created_at)).all()
        return item

    def approveRequest(self, id: int) -> bool:
        item = self.db.query(ApprovalRequestModel).filter(ApprovalRequestModel.id == id,
                                                          ApprovalRequestModel.approved == False).first()
        if item:
            item.approved = True
            approved_instrument = InstrumentModel(
                instrument=item.instrument_name,
                instrument_group=item.instrument_group,
                department=item.department,
                risk_country=item.country,
                exchange=item.exchange_name,
                trade_ccy=item.trade_ccy,
                settlement_ccy=item.settlement_ccy
            )
            self.db.add(approved_instrument)
            self.db.commit()
            self.db.refresh(approved_instrument)
            return True
        return False

    def getUserRequests(self, user: JWTToken) -> list[GetAllRequest]:
        user = get_current_user(user.access_token)
        print(user)
        item = self.db.query(ApprovalRequestModel).filter(ApprovalRequestModel.email == user).all()
        return item