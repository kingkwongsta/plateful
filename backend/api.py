from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/test")
async def testing():
    return {"message": "TESTING TESTING TESTING"}

@app.get("/more")
async def more():
    return {"1 + 1 = 3"}

from food import generate_food_recipe

@app.get("/food")
async def get_food(cuisine: str = Query(default=None), course: str = Query(default=None), allergies: str = Query(default=None)):
    return generate_food_recipe(cuisine, course, allergies)
