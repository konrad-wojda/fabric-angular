from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session as _Session

from core.db_src.services import draw_services as services
from core.db_src.schemas.schemas import  Drawings
from core.db_src.db.setting import get_db


router_draw = APIRouter(
    prefix="/api/drawings",
    tags=["Drawings"],
    responses={404: {"description": "Not found"}},
)


@router_draw.get("/get")
async def get_drawings(offset: int = 0, limit: int = 25, db: _Session = Depends(get_db)):
    """
    Gets data about drawings from DB
    :param offset: how many rows should be missed from id=0
    :param limit: limits how many records are returned
    :param db: Session of DB
    :return: list of Drawing
    """
    drawings = await services.get_drawings(db=db, offset=offset, limit=limit)

    return JSONResponse(content=jsonable_encoder(drawings))


@router_draw.post("/create", status_code=201)
async def create_drawing(drawing: Drawings,
                         db: _Session = Depends(get_db)):
    """
    Uses data passed by user to save drawing
    :param drawing: data from user
    :param db:Session of DB
    :return: function create drawing
    """
    return await services.create_drawing(drawing, db)
