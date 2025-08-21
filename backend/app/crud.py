from typing import List, Optional
from bson import ObjectId
from .db import cocktails_col
from .schemas import CocktailIn, CocktailOut


def _to_out(doc) -> CocktailOut:
    return CocktailOut(
        id=str(doc["_id"]),
        name=doc.get("name", ""),
        category=doc.get("category", ""),
        alcoholic=doc.get("alcoholic", True),
        isFavorite=doc.get("isFavorite", False),
        rating=doc.get("rating"),
        ingredients=doc.get("ingredients", []),
        instructions=doc.get("instructions", ""),
    )


def list_cocktails() -> List[CocktailOut]:
    return [_to_out(d) for d in cocktails_col.find()]


def get_cocktail(cid: str) -> Optional[CocktailOut]:
    try:
        oid = ObjectId(cid)
    except Exception:
        return None
    d = cocktails_col.find_one({"_id": oid})
    return _to_out(d) if d else None


def create_cocktail(c: CocktailIn) -> CocktailOut:
    res = cocktails_col.insert_one(c.model_dump())
    return CocktailOut(id=str(res.inserted_id), **c.model_dump())


def update_cocktail(cid: str, c: CocktailIn) -> Optional[CocktailOut]:
    try:
        oid = ObjectId(cid)
    except Exception:
        return None
    result = cocktails_col.replace_one({"_id": oid}, c.model_dump())
    if result.matched_count == 0:
        return None
    return CocktailOut(id=cid, **c.model_dump())


def delete_cocktail(cid: str) -> bool:
    try:
        oid = ObjectId(cid)
    except Exception:
        return False
    result = cocktails_col.delete_one({"_id": oid})
    return result.deleted_count > 0
