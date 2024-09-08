from fastapi import APIRouter, Depends
from ..schemas.approval_requests import ApprovalRequestFormFromTrader, GetAllRequest, CreateApprovalRequestResponseBody, GetNonApprovedRequest
from ..schemas.users import UserToken, JWTToken
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


@router.get("/all_not_yet_approved", response_model=list[GetNonApprovedRequest])
async def get_approval_requests(db: get_db = Depends()):
    item = ApprovalRequestService(db).getApprovalRequests()
    return handle_result(item)


@router.get("/all", response_model=list[GetAllRequest])
async def get_approval_requests(db: get_db = Depends()):
    item = ApprovalRequestService(db).getAllRequests()
    return handle_result(item)


@router.post("/approve-request")
async def approve_request(req_id: int, db: get_db = Depends()):
    item = ApprovalRequestService(db).approveRequest(req_id)
    return handle_result(item)


@router.post("/user-requests")
async def user_requests(user: JWTToken, db: get_db = Depends()):
    item = ApprovalRequestService(db).getUserRequests(user)
    return handle_result(item)