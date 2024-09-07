from fastapi import APIRouter, Depends

from ..config.database import get_db
from ..services.trades import TradeService
from ..utils.service_result import handle_result

router = APIRouter(
    prefix="/trades",
    tags=["trades"]
)


@router.get("/{id}")
async def get_trades(id: str, db: get_db = Depends()):
    item = TradeService(db).getTrades(id)
    return handle_result(item)

