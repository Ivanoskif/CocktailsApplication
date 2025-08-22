import type { Cocktail, CocktailIn } from "./types";

export const API_BASE: string = (import.meta as any).env?.VITE_API_BASE ?? "";

const COCKTAILS_URL = `${API_BASE}/api/cocktails/`;

async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`HTTP ${res.status}: ${msg}`);
  }
  return res.json() as Promise<T>;
}

export async function listCocktails(): Promise<Cocktail[]> {
  return http<Cocktail[]>(COCKTAILS_URL);
}

export async function createCocktail(body: CocktailIn): Promise<Cocktail> {
  return http<Cocktail>(COCKTAILS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function updateCocktail(id: string, body: CocktailIn): Promise<Cocktail> {
  return http<Cocktail>(`${API_BASE}/api/cocktails/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function deleteCocktail(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/cocktails/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`HTTP ${res.status}: ${msg}`);
  }
}

export async function toggleFavorite(c: Cocktail): Promise<Cocktail> {
  const payload: CocktailIn = {
    name: c.name,
    category: c.category,
    alcoholic: c.alcoholic,
    isFavorite: !c.isFavorite,
    rating: c.rating,
    ingredients: c.ingredients,
    instructions: c.instructions,
  };
  return updateCocktail(c.id, payload);
}