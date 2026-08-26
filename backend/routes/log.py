from fastapi import APIRouter, UploadFile, File

from services.log_service import analyze_log


router = APIRouter()


@router.post("/analyze-log")
async def analyze_log_route(file: UploadFile = File(...)):

    print("========== REQUEST RECEIVED ==========")
    print(file.filename)

    contents = await file.read()

    print("File Size:", len(contents))

    log_text = contents.decode("utf-8")

    result = analyze_log(log_text)

    return {
        "filename": file.filename,
        "analysis": result["report"],
        "analysis_time": result["analysis_time"],
        "chunks_retrieved": result["chunks_retrieved"]
    }