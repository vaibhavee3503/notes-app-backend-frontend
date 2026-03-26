from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.notes import Note
from app.models.user import User
from app.schemas.notes import NoteCreate
from app.auth import create_access_token
from jose import jwt
from fastapi import Header

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"

router = APIRouter()

# Get current user from token
def get_current_user(token: str = Header(...), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        user = db.query(User).filter(User.email == email).first()
        return user
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

# CREATE NOTE
@router.post("/notes")
def create_note(note: NoteCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    new_note = Note(
        title=note.title,
        content=note.content,
        user_id=user.id
    )
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return {"message": "Note created"}

# GET NOTES
@router.get("/notes")
def get_notes(db: Session = Depends(get_db), user=Depends(get_current_user)):
    notes = db.query(Note).filter(Note.user_id == user.id).all()
    return notes

# DELETE NOTE
@router.delete("/notes/{id}")
def delete_note(id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    note = db.query(Note).filter(Note.id == id, Note.user_id == user.id).first()

    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()
    return {"message": "Note deleted"}