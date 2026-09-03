import { ingredientById, ingredientIsSelected, selectedNameSet } from "./catalog";
import { RECIPES } from "./recipes";
import type {
  DisplayIngredient,
  RecommendQuery,
  Recommendation,
  Recipe,
} from "./types";

function passesTime(minutes: number, filter: RecommendQuery["timeFilter"]): boolean {
  if (filter === "15분") return minutes <= 15;
  if (filter === "30분") return minutes <= 30;
  return true;
}

export function scaleAmount(amount: number | null, servings: number): number | null {
  if (amount === null) return null;
  return Math.round(amount * servings * 10) / 10;
}

export function scaleIngredients(
  ingredients: DisplayIngredient[],
  servings: RecommendQuery["servings"],
): DisplayIngredient[] {
  return ingredients.map((item) => ({
    ...item,
    amount: scaleAmount(item.amount, servings),
  }));
}

function missingRequired(recipe: Recipe, selectedNames: Set<string>): string[] {
  return recipe.required.filter((id) => !ingredientIsSelected(id, selectedNames));
}

function missingLabel(id: string): string {
  return ingredientById(id)?.name ?? id;
}

export function recommend(
  query: RecommendQuery,
  recipes: Recipe[] = RECIPES,
): Recommendation[] {
  if (query.selectedIds.length === 0 && query.customNames.length === 0) {
    return [];
  }

  const selectedNames = selectedNameSet(query.selectedIds, query.customNames);
  const results: Recommendation[] = [];

  for (const recipe of recipes) {
    if (!passesTime(recipe.minutes, query.timeFilter)) continue;

    const missing = missingRequired(recipe, selectedNames);
    if (missing.length > 1) continue;

    const status = missing.length === 0 ? "가능" : "하나부족";
    results.push({
      recipe,
      status,
      missingName: missing.length === 1 ? missingLabel(missing[0]) : null,
      ingredients: scaleIngredients(recipe.ingredients, query.servings),
    });
  }

  return results.sort((a, b) => {
    if (a.status !== b.status) return a.status === "가능" ? -1 : 1;
    if (a.recipe.minutes !== b.recipe.minutes) {
      return a.recipe.minutes - b.recipe.minutes;
    }
    return a.recipe.name.localeCompare(b.recipe.name, "ko");
  });
}
