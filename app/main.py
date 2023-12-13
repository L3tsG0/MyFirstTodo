from fastapi import FastAPI
from .router.task import router as task_router
from fastapi.middleware.cors import CORSMiddleware







api = FastAPI(debug=True)
api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
api.include_router(router=task_router)


