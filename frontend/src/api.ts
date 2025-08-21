import type { Cocktail, CocktailIn } from "./types";

const API_BASE: string =
  (import.meta as any).env?.VITE_API_BASE || "http://localhost:8000";

export async function listCocktails(): Promise<Cocktail[]> {
  const r = await fetch(`${API_BASE}/api/cocktails`);
  if (!r.ok) throw new Error("Failed to load cocktails");
  return r.json();
}

export async function createCocktail(body: CocktailIn): Promise<Cocktail> {
  const r = await fetch(`${API_BASE}/api/cocktails`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error("Failed to create");
  return r.json();
}

export async function updateCocktail(
  id: string,
  body: CocktailIn
): Promise<Cocktail> {
  const r = await fetch(`${API_BASE}/api/cocktails/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error("Failed to update");
  return r.json();
}

export async function deleteCocktail(id: string): Promise<void> {
  const r = await fetch(`${API_BASE}/api/cocktails/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Failed to delete");
}

export async function toggleFavorite(c: Cocktail): Promise<Cocktail> {
  const updated: CocktailIn = {
    name: c.name,
    category: c.category,
    alcoholic: c.alcoholic,
    isFavorite: !c.isFavorite,
    rating: c.rating,
    ingredients: c.ingredients,
    instructions: c.instructions,
  };
  return updateCocktail(c.id, updated);
}
