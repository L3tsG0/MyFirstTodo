from fastapi import FastAPI
from .router.task import router as task_router

api = FastAPI()
api.include_router(router=task_router)


