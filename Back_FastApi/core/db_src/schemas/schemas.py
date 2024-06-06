from typing import List
from pydantic import BaseModel


class Drawing(BaseModel):
    id_drawing: int
    drawing: str

    class Config:
        from_attributes = True


class Drawings(BaseModel):
    drawing: List[dict]
