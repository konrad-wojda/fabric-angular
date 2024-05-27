from typing import Type

from sqlalchemy.orm import Session as _Session

from core.db_src.db_models import models


async def get_drawings(db: _Session, offset: int = 0, limit: int = 25) -> list[Type[models.DrawModel]]:
    """
    Gets data about drawings from DB
    :param limit: limits how many records are returned
    :param offset: how many rows should be missed from id=0
    :param db: Session of DB
    :return: list of drawings data from DB
    """
    drawings = db.query(models.DrawModel).offset(offset).limit(limit).all()

    return drawings


async def create_drawing(drawing: str, db: _Session) -> models.DrawModel:
    """
    Creating new drawing in DB
    :param drawing: data about drawing
    :param db: Session of DB
    :return: Data of created user
    """
    draw_obj = models.DrawModel(drawing=drawing)
    db.add(draw_obj)
    db.commit()
    db.refresh(draw_obj)

    return draw_obj
