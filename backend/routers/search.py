from fastapi import APIRouter, Depends, Query
from ..config.database import get_db
from ..services.search import SearchService
from ..utils.service_result import handle_result
from typing import Optional

router = APIRouter(
    prefix="/approved_instruments",
    tags=["approved_instruments"]
)

@router.get("/") 
async def get_instruments(
    instrument_group: Optional[str] = Query(None),
    instrument: Optional[str] = Query(None),
    department: Optional[str] = Query(None),
    risk_country: Optional[str] = Query(None),
    exchange: Optional[str] = Query(None),
    trade_ccy: Optional[str] = Query(None),
    settlement_ccy: Optional[str] = Query(None),
    db: get_db = Depends()):
    item = SearchService(db).search(
        instrument_group=instrument_group,
        instrument=instrument,
        department=department,
        risk_country=risk_country,
        exchange=exchange,
        trade_ccy=trade_ccy,
        settlement_ccy=settlement_ccy
    )
    return handle_result(item)


@router.get("/{field}") 
async def get_instrument_field_list(
    field: str, 
    db: get_db = Depends()):
    item = SearchService(db).getList(field)
    return handle_result(item)

@router.get("/counterparty/{instrument_group}") 
async def get_counterparties_for_instrument_group(
    instrument_group: str, 
    db: get_db = Depends()):
    item = SearchService(db).getCounterparties(instrument_group)
    return handle_result(item)

# @router.get("/") 
# async def get_all_instruments(db: get_db = Depends()):
#     item = SearchService(db).search()
#     return handle_result(item)


# @router.get("/", response_model=UserRegisterResponse)
# async def get_instruments(instrument_group: Optional[str] = Query(None),
#                           db: get_db = Depends()):
#     item = SearchService(db).signup(item)
#     return handle_result(item)


# @router.post("/signin", response_model=UserToken)
# async def signin(item: OAuth2PasswordRequestForm = Depends(), db: get_db = Depends()):
#     item = UserService(db).authenticate_user(item.username, item.password)
#     return handle_result(item)
