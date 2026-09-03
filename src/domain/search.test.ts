import { describe, expect, it } from "vitest";
import type { Recipe } from "./types";
import { searchRecipes } from "./search";

const fixtures: Recipe[] = [
  {
    id: "kimchi-jjigae",
    name: "김치찌개",
    cuisine: "한식",
    minutes: 30,
    baseServings: 1,
    required: ["kimchi", "pork"],
    ingredients: [
      { name: "김치", amount: 150, unit: "g" },
      { name: "돼지고기", amount: 80, unit: "g" },
    ],
    steps: ["끓인다."],
  },
  {
    id: "kimchi-bap",
    name: "김치볶음밥",
    cuisine: "한식",
    minutes: 15,
    baseServings: 1,
    required: ["kimchi", "rice"],
    ingredients: [
      { name: "김치", amount: 100, unit: "g" },
      { name: "밥", amount: 1, unit: "공기" },
    ],
    steps: ["볶는다."],
  },
  {
    id: "pasta",
    name: "토마토파스타",
    cuisine: "집양식",
    minutes: 25,
    baseServings: 1,
    required: ["spaghetti", "tomato"],
    ingredients: [
      { name: "스파게티면", amount: 80, unit: "g" },
      { name: "토마토", amount: 1, unit: "개" },
    ],
    steps: ["삶는다."],
  },
];

describe("searchRecipes", () => {
  it("빈 검색어면 빈 배열이다", () => {
    expect(searchRecipes("   ", fixtures)).toEqual([]);
  });

  it("요리 이름으로 찾는다", () => {
    const hits = searchRecipes("김치찌개", fixtures);
    expect(hits.map((row) => row.id)).toEqual(["kimchi-jjigae"]);
  });

  it("띄어쓰기를 무시하고, 이름에 들어간 글자로 찾는다", () => {
    const hits = searchRecipes("김치 찌", fixtures);
    expect(hits.map((row) => row.id)).toContain("kimchi-jjigae");
  });

  it("재료 이름으로도 찾는다", () => {
    const hits = searchRecipes("돼지고기", fixtures);
    expect(hits.map((row) => row.id)).toEqual(["kimchi-jjigae"]);
  });

  it("이름에 검색어가 들어있는 요리를 앞에 둔다", () => {
    const hits = searchRecipes("김치", fixtures);
    expect(hits[0]?.name.startsWith("김치")).toBe(true);
    expect(hits.map((row) => row.id)).not.toContain("pasta");
  });
});
