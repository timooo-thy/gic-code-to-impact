from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from ..schemas.users import UserRegisterResponse, UserRegisterRequest
from ..config.database import get_db
from ..services.users import UserService

router = APIRouter(
    prefix="/users",
    tags=["users"]
)



@router.post("/signup")
async def signup(item: UserRegisterRequest, db: get_db = Depends()):
    item = UserService(db).signup(item)
    return item