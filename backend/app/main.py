from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.database import engine, Base
from app.models import user, notes
from app.routes import user as user_routes
from app.routes import notes as notes_routes   # ✅ ADD THIS

app = FastAPI()
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create tables
Base.metadata.create_all(bind=engine)

app.include_router(user_routes.router)
app.include_router(notes_routes.router)   # ✅ ADD THIS

@app.get("/")
def home():
    return {"message": "API is running 🚀"}