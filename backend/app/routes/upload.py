from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.dataset_service import read_dataset
import os
import shutil

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

os.makedirs(UPLOAD_FOLDER, exist_ok=True) 

@router.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):

    allowed_extensions = [".csv", ".xlsx", ".xls"]

    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only CSV and Excel files are allowed."
        )

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    dataset_info = read_dataset(file_path)
    print(dataset_info)

    return {
        "status": "success",
        "filename": file.filename,
        "data": dataset_info
    }