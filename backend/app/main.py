from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI(
    title="InsightAI API",
    version="1.0.0",
    description="AI Powered Automated Data Analysis Platform"
)

# Allow React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to InsightAI 🚀",
        "status": "Backend is running successfully"
    }


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Read CSV or Excel
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file.file)
        elif file.filename.endswith(".xlsx"):
            df = pd.read_excel(file.file)
        else:
            return {"error": "Only CSV and Excel files are allowed"}

        return {
    "success": True,
    "filename": file.filename,
    "shape": {
        "rows": df.shape[0],
        "columns": df.shape[1]
    },
    "column_names": list(df.columns),
    "preview": df.head(5).fillna("").to_dict(orient="records")
}

    except Exception as e:
        return {"error": str(e)}