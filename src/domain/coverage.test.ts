import { describe, expect, it } from "vitest";
import { CHECKLIST } from "./catalog";
import { RECIPES } from "./recipes";

describe("checklist coverage", () => {
  it("지금 있는 것 재료는 그 하나만 골라도 가능한 요리가 하나씩 있다", () => {
    const missing = CHECKLIST.filter(
      (ingredient) =>
        !RECIPES.some(
          (recipe) => recipe.required.length === 1 && recipe.required[0] === ingredient.id,
        ),
    ).map((ingredient) => ingredient.name);
    expect(missing).toEqual([]);
  });
});
