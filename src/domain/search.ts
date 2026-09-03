import { namesForIngredient, normalizeName } from "./catalog";
import { RECIPES } from "./recipes";
import type { Recipe } from "./types";

function haystack(recipe: Recipe): string {
  const parts = [
    recipe.name,
    recipe.cuisine,
    ...recipe.ingredients.map((item) => item.name),
    ...recipe.required.flatMap((id) => namesForIngredient(id)),
  ];
  return normalizeName(parts.join(" "));
}

function rank(recipe: Recipe, needle: string): number {
  const name = normalizeName(recipe.name);
  if (name === needle) return 0;
  if (name.startsWith(needle)) return 1;
  if (name.includes(needle)) return 2;
  return 3;
}

export function searchRecipes(query: string, recipes: Recipe[] = RECIPES): Recipe[] {
  const needle = normalizeName(query);
  if (!needle) return [];
  return recipes
    .filter((recipe) => haystack(recipe).includes(needle))
    .sort((a, b) => {
      const rankDiff = rank(a, needle) - rank(b, needle);
      if (rankDiff !== 0) return rankDiff;
      return a.name.localeCompare(b.name, "ko");
    });
}
