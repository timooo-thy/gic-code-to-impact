from ..models.approval_requests import ApprovalRequestModel
from ..schemas.approval_requests import ApprovalRequestFormFromTrader, GetRequest
from ..services.main import AppService, AppCRUD
from ..utils.service_result import ServiceResult
from ..utils.app_exceptions import AppException

class ApprovalRequestService(AppService):
    def createApprovalRequestFormFromTrader(self, item: ApprovalRequestFormFromTrader) -> ServiceResult:
        item = ApprovalRequestCRUD(self.db).createApprovalRequestFormFromTrader(item)
        if not item:
            return ServiceResult(AppException.AddItem({"error": "Failed"}))
        return ServiceResult(item)

    def getApprovalRequests(self) -> ServiceResult:
        item = ApprovalRequestCRUD(self.db).getApprovalRequests()
        return ServiceResult(item)

    def approveRequest(self, id: int) -> ServiceResult:
        item = ApprovalRequestCRUD(self.db).approveRequest(id)
        if not item:
            return ServiceResult(AppException.InvalidItem({"error": "Failed"}))
        return ServiceResult(item)


class ApprovalRequestCRUD(AppCRUD):
    def createApprovalRequestFormFromTrader(self, item: ApprovalRequestFormFromTrader) -> ApprovalRequestModel:
        item = ApprovalRequestModel(
            instrument_name = item.instrument_name,
            currency = item.currency,
            country = item.country,
            exchange_name = item.exchange_name,
            department = item.department,
            approved=False,
            approved_by_user_id=None
        )
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item

    def getApprovalRequests(self) -> list[GetRequest]:
        item = self.db.query(ApprovalRequestModel).filter(ApprovalRequestModel.approved == False).all()
        return item

    def approveRequest(self, id: int) -> bool:
        item = self.db.query(ApprovalRequestModel).filter(ApprovalRequestModel.id == id,
                                                          ApprovalRequestModel.approved == False).first()
        if item:
            item.approved = True
            self.db.commit()
            return True
        return False
