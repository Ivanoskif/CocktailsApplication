from fastapi import APIRouter, HTTPException
from typing import List
from ..schemas import CocktailIn, CocktailOut
from .. import crud

router = APIRouter(prefix="/api/cocktails", tags=["cocktails"])


@router.get("/", response_model=List[CocktailOut])
async def list_():
    return crud.list_cocktails()


@router.get("/{cid}", response_model=CocktailOut)
async def get_(cid: str):
    c = crud.get_cocktail(cid)
    if not c:
        raise HTTPException(status_code=404, detail="Not found")
    return c


@router.post("/", response_model=CocktailOut, status_code=201)
async def create_(c: CocktailIn):
    return crud.create_cocktail(c)


@router.put("/{cid}", response_model=CocktailOut)
async def update_(cid: str, c: CocktailIn):
    out = crud.update_cocktail(cid, c)
    if not out:
        raise HTTPException(status_code=404, detail="Not found")
    return out


@router.delete("/{cid}", status_code=204)
async def delete_(cid: str):
    ok = crud.delete_cocktail(cid)
    if not ok:
        raise HTTPException(status_code=404, detail="Not found")
    return
