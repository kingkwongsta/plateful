import os
from dotenv import load_dotenv
from typing import List
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_community.llms.octoai_endpoint import OctoAIEndpoint

class Ingredient(BaseModel):
    name: str = Field(description="Name of the ingredient")
    quantity: str = Field(description="Quantity of the ingredient")

class Recipe(BaseModel):
    name: str = Field(description="Name of the dish")
    description: str = Field(description="Description of the dish")
    ingredients: List[Ingredient] = Field(description="List of ingredients")
    instructions: List[str] = Field(description="List of preparation instructions")

def generate_food_recipe(cuisine: str, course: str, allergies: str) -> Recipe:
    load_dotenv()
    octoai_api_token = os.getenv("OCTOAI_API_TOKEN")
    if not octoai_api_token:
        raise ValueError("OCTOAI_API_TOKEN not found in .env file or environment variables.")

    endpoint_url = "https://text.octoai.run/v1/chat/completions"
    model = OctoAIEndpoint(
        endpoint_url=endpoint_url,
        octoai_api_token=octoai_api_token,
        model_kwargs={
            "model": "smaug-72b-chat",
            "max_tokens": 1024,
            "presence_penalty": 0,
            "temperature": 0.6,
            "top_p": 0.9,
            "messages": [
                {"role": "system", "content": "You are an expert chef that outputs JSON"}
            ],
        },
    )

    instructions = f"Create a unique and creative {course} recipe based on the following user preferences: {cuisine} cuisine and {allergies} allergies. Do not include {cuisine}, {course}, or {allergies} in the recipe name."
    parser = JsonOutputParser(pydantic_object=Recipe)
    recipe_query = instructions
    prompt = PromptTemplate(
        template="Answer the user query.\n{format_instructions}\n{query}\n",
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    chain = prompt | model | parser
    response = chain.invoke({"query": recipe_query})
    return response