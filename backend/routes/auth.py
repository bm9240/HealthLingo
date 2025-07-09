from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from utils.db import users_collection

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# -------------------------------
# Models
# -------------------------------

class RegisterUser(BaseModel):
    name: str
    email: EmailStr
    password: str
    dob: str
    gender: str
    medical_history: str
    allergies: str

class LoginUser(BaseModel):
    email: EmailStr
    password: str


# -------------------------------
# Register Route
# -------------------------------

@router.post("/register")
def register(user: RegisterUser):
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists.")

    hashed_password = pwd_context.hash(user.password)
    user_data = user.dict()
    user_data["password"] = hashed_password

    users_collection.insert_one(user_data)

    return {"message": "User registered successfully."}

@router.post("/login")
def login(user: LoginUser):
    db_user = users_collection.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")

    if not pwd_context.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid password.")

    return {
        "message": "Login successful",
        "user": {
            "name": db_user.get("name"),
            "email": db_user.get("email"),
        }
    }