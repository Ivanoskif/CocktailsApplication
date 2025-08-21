from pydantic import BaseModel, Field
from typing import List, Optional

class Ingredient(BaseModel):
    name: str
    amount: float = 0
    unit: str = "ml"

class CocktailIn(BaseModel):
    name: str
    category: str
    alcoholic: bool = True
    isFavorite: bool = False
    rating: Optional[int] = Field(default=None, ge=1, le=5)
    ingredients: List[Ingredient] = []
    instructions: str = ""
    
class CocktailOut(CocktailIn):
    id: str
