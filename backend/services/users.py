from ..services.main import AppService, AppCRUD
from ..utils.service_result import ServiceResult
from ..utils.app_exceptions import AppException
from ..models.users import UserModel
from ..schemas.users import UserRegisterRequest
from ..utils.credentials_misc import get_password_hash


class UserService(AppService):
    def signup(self, item: UserRegisterRequest) -> ServiceResult:
        if not item.password == item.confirm_password:
            return ServiceResult(AppException.InvalidItem({"error": "password and confirm password don't match"}))
        item = UserCRUD(self.db).signup(item)
        if not item:
            return ServiceResult(AppException.AddItem())
        return ServiceResult(item)


class UserCRUD(AppCRUD):
    def signup(self, item: UserRegisterRequest) -> UserModel:
        if item.role is None:
            item.role = "trader"
        item = UserModel(email=item.email,
                         password=get_password_hash(item.password),
                         role=item.role)
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item
