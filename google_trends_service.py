from fastapi import FastAPI
from pytrends.request import TrendReq
from typing import List, Dict
import json

app = FastAPI()
pytrends = TrendReq(hl='en-US', tz=360)

@app.get("/trends/{keyword}")
async def get_trends(keyword: str):
    try:
        # Build payload
        pytrends.build_payload([keyword], timeframe='today 12-m')
        
        # Get interest over time
        interest_over_time_df = pytrends.interest_over_time()
        
        # Convert to JSON-friendly format
        if not interest_over_time_df.empty:
            result = interest_over_time_df[keyword].to_dict()
            # Convert datetime index to string
            formatted_result = {str(date): value for date, value in result.items()}
            return {"success": True, "data": formatted_result}
        else:
            return {"success": False, "error": "No data found"}
            
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/related-queries/{keyword}")
async def get_related_queries(keyword: str):
    try:
        # Build payload
        pytrends.build_payload([keyword], timeframe='today 12-m')
        
        # Get related queries
        related_queries = pytrends.related_queries()
        
        if keyword in related_queries:
            result = {
                "top": related_queries[keyword]["top"].to_dict() if related_queries[keyword]["top"] is not None else {},
                "rising": related_queries[keyword]["rising"].to_dict() if related_queries[keyword]["rising"] is not None else {}
            }
            return {"success": True, "data": result}
        else:
            return {"success": False, "error": "No related queries found"}
            
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
