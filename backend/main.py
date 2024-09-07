from fastapi import FastAPI
from .config.database import create_tables
from fastapi.middleware.cors import CORSMiddleware
from .routers.users import router as user_router
from .routers.approval_requests import router as approval_request_router
from .routers.search import router as search_router


create_tables()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(user_router)
app.include_router(approval_request_router)
app.include_router(search_router)
