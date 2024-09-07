from fastapi import APIRouter, Depends

from ..schemas.approval_requests import ApprovalRequestFormFromTrader, CreateApprovalRequestResponseBody, GetRequest
from ..schemas.users import UserToken
from ..config.database import get_db
from ..services.approval_requests import ApprovalRequestService
from ..utils.service_result import handle_result

router = APIRouter(
    prefix="/approval-request",
    tags=["approval-request"]
)


@router.post("/", response_model=CreateApprovalRequestResponseBody)
async def signup(req_item: ApprovalRequestFormFromTrader, db: get_db = Depends()):
    item = ApprovalRequestService(db).createApprovalRequestFormFromTrader(req_item)
    return handle_result(item)


@router.get("/", response_model=list[GetRequest])
async def get_approval_requests(db: get_db = Depends()):
    item = ApprovalRequestService(db).getApprovalRequests()
    return handle_result(item)


@router.post("/approve-request")
async def approve_request(req_id: int, db: get_db = Depends()):
    item = ApprovalRequestService(db).approveRequest(req_id)
    return handle_result(item)
