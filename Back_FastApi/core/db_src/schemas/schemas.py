from pydantic import BaseModel


class Drawing(BaseModel):
    id_drawing: int
    drawing: str

    class Config:
        orm_mode = True
