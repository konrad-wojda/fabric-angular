from sqlalchemy.orm import mapped_column, Mapped

from core.db_src.db.database import Base


class DrawModel(Base):
    __tablename__ = "drawings"
#
    id_drawing: Mapped[int] = mapped_column(primary_key=True)
    drawing: Mapped[str] = mapped_column(nullable=False, default="")
