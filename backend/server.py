from fastapi import FastAPI, APIRouter, Request, Response, Header, Depends, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class AppointmentCreate(BaseModel):
    client_name: str
    phone: str
    email: Optional[str] = ""
    service_id: str
    vehicle_info: Optional[str] = ""
    preferred_date: str
    preferred_time: Optional[str] = ""
    notes: Optional[str] = ""


class Appointment(AppointmentCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    email: str
    name: str
    picture: Optional[str] = ""


async def get_current_user(request: Request):
    token = request.cookies.get("session_token")
    if not token:
        auth = request.headers.get("Authorization")
        if auth and auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


@api_router.get("/auth/session")
async def exchange_session(response: Response, x_session_id: str = Header()):
    async with httpx.AsyncClient(timeout=15) as http:
        r = await http.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": x_session_id},
        )
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session_id")
    data = r.json()
    existing = await db.users.find_one({"email": data["email"]}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id,
            "email": data["email"],
            "name": data.get("name", ""),
            "picture": data.get("picture", ""),
            "created_at": datetime.now(timezone.utc),
        })
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": data["session_token"],
        "expires_at": datetime.now(timezone.utc) + timedelta(days=7),
        "created_at": datetime.now(timezone.utc),
    })
    response.set_cookie(
        key="session_token",
        value=data["session_token"],
        path="/",
        secure=True,
        httponly=True,
        samesite="none",
        max_age=7 * 24 * 3600,
    )
    return {
        "user_id": user_id,
        "email": data["email"],
        "name": data.get("name", ""),
        "picture": data.get("picture", ""),
    }


@api_router.get("/auth/me", response_model=User)
async def auth_me(user=Depends(get_current_user)):
    return User(**user)


@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_many({"session_token": token})
    response.delete_cookie("session_token", path="/", secure=True, samesite="none")
    return {"ok": True}


@api_router.get("/")
async def root():
    return {"message": "MP Automotive Repair API"}


@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(input: AppointmentCreate):
    obj = Appointment(**input.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.appointments.insert_one(doc)
    return obj


@api_router.get("/appointments", response_model=List[Appointment])
async def list_appointments(skip: int = 0, limit: int = 50, user=Depends(get_current_user)):
    limit = min(limit, 100)
    items = await db.appointments.find({}, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
