export type Ingredient = { name: string; amount: number; unit: string };

export type Cocktail = {
  id: string;
  name: string;
  category: string;
  alcoholic: boolean;
  isFavorite: boolean;
  rating?: number;
  ingredients: Ingredient[];
  instructions: string;
};

export type CocktailIn = Omit<Cocktail, "id">;
