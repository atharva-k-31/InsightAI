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

        filename = file.filename.lower()

        # ============================================
        # Read CSV or Excel File
        # ============================================

        if filename.endswith(".csv"):
            df = pd.read_csv(file.file)

        elif filename.endswith(".xlsx"):
            df = pd.read_excel(file.file)

        else:
            return {
                "success": False,
                "error": "Only CSV and Excel files are allowed."
            }

        # ============================================
        # Dataset Information
        # ============================================

        column_info = []

        for column in df.columns:

            column_info.append({

                "column_name": column,
                "data_type": str(df[column].dtype),
                "null_values": int(df[column].isnull().sum()),
                "non_null_values": int(df[column].count()),
                "unique_values": int(df[column].nunique())

            })

        # ============================================
        # Statistical Summary
        # ============================================

        statistics = []

        numeric_columns = df.select_dtypes(include="number").columns

        for column in numeric_columns:

            statistics.append({

                "column_name": column,

                "mean": round(float(df[column].mean()), 2),

                "variance": round(float(df[column].var()), 2),

                "std": round(float(df[column].std()), 2),

                "min": round(float(df[column].min()), 2),

                "q1": round(float(df[column].quantile(0.25)), 2),

                "median": round(float(df[column].median()), 2),

                "q3": round(float(df[column].quantile(0.75)), 2),

                "max": round(float(df[column].max()), 2)

            })

        # ============================================
        # Response
        # ============================================

        return {

            "success": True,

            "filename": file.filename,

            "row_count": len(df),

            "column_count": len(df.columns),

            "column_names": list(df.columns),

            "column_info": column_info,

            "statistics": statistics,

            "preview": df.head(5).fillna("").to_dict(orient="records")

        }

    except Exception as e:

        return {

            "success": False,

            "error": str(e)

        }