from fastapi import APIRouter
from core.endpoints import endpoints

router = APIRouter()
router.include_router(endpoints.router_draw)