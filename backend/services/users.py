from ..services.main import AppService, AppCRUD
from ..utils.service_result import ServiceResult
from ..utils.app_exceptions import AppException
from ..models.users import UserModel
from ..schemas.users import UserRegisterRequest, UserToken
from ..utils.credentials_misc import get_password_hash, create_access_token, verify_password
from ..config.credentials_config import ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta


class UserService(AppService):
    def signup(self, item: UserRegisterRequest) -> ServiceResult:
        if not item.password == item.confirm_password:
            return ServiceResult(AppException.InvalidItem({"error": "password and confirm password don't match"}))
        item = UserCRUD(self.db).signup(item)
        if not item:
            return ServiceResult(AppException.AddItem({"error": "Failed"}))
        return ServiceResult(item)

    def authenticate_user(self, email: str, password: str) -> ServiceResult:
        user = UserCRUD(self.db).authenticate_user(email, password)
        if not user:
            return ServiceResult(AppException.InvalidItem({"error": "Incorrect email or password"}))
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"email": email, "role": user.role}, expires_delta=access_token_expires)
        user_token = UserToken(
            access_token=access_token,
            token_type="bearer"
        )
        return ServiceResult(user_token)


class UserCRUD(AppCRUD):
    def signup(self, item: UserRegisterRequest) -> UserModel:
        user = self.db.query(UserModel).filter(UserModel.email == item.email).first()
        if user:
            return None
        if item.role is None:
            item.role = "trader"
        item = UserModel(email=item.email,
                         password=get_password_hash(item.password),
                         role=item.role)
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item

    def authenticate_user(self, email: str, password: str) -> UserModel:
        user = self.db.query(UserModel).filter(UserModel.email == email).first()
        if user:
            if verify_password(password, user.password):
                return user
        return None
