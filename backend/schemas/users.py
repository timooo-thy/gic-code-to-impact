from pydantic import BaseModel
from typing import Optional


class UserRegisterRequest(BaseModel):
    email: str
    password: str
    confirm_password: str
    role: str


class UserSignInRequest(BaseModel):
    email: str
    password: str


class UserSignInResponse(BaseModel):
    access_token: str
    token_type: str


class UserRegisterResponse(BaseModel):
    email: str


class UserTokenData(BaseModel):
    email: Optional[str] = None


class UserToken(BaseModel):
    access_token: str
    token_type: str
