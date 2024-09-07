from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from ..schemas.users import UserRegisterResponse, UserRegisterRequest, UserToken, UserSignInRequest
from ..config.database import get_db
from ..services.users import UserService
from ..utils.service_result import handle_result

router = APIRouter(
    prefix="/users",
    tags=["users"]
)


@router.post("/signup", response_model=UserRegisterResponse)
async def signup(item: UserRegisterRequest, db: get_db = Depends()):
    item = UserService(db).signup(item)
    return handle_result(item)


@router.post("/signin", response_model=UserToken)
async def signin(item: OAuth2PasswordRequestForm = Depends(), db: get_db = Depends()):
    item = UserService(db).authenticate_user(item.username, item.password)
    return handle_result(item)