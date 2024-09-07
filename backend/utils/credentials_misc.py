import bcrypt
from typing import Optional
from datetime import timedelta, datetime
from fastapi import Depends, HTTPException, status
from ..config.credentials_config import SECRET_KEY, ALGORITHM, oauth2_scheme
from ..config.database import get_db
from ..models.users import UserModel
import jwt


def get_password_hash(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')