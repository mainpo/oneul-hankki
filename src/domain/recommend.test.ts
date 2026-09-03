import { describe, expect, it } from "vitest";
import { recommend } from "./recommend";
import type { Recipe } from "./types";

const saltOnly: Recipe = {
  id: "salt-soup",
  name: "소금국",
  cuisine: "한식",
  minutes: 5,
  baseServings: 1,
  required: [],
  ingredients: [
    { name: "물", amount: 300, unit: "ml", staple: true },
    { name: "소금", amount: 1, unit: "꼬집", staple: true },
  ],
  steps: ["물을 끓여 소금을 넣는다."],
};

const eggSteam: Recipe = {
  id: "egg-steam",
  name: "계란찜",
  cuisine: "한식",
  minutes: 12,
  baseServings: 1,
  required: ["egg"],
  ingredients: [
    { name: "계란", amount: 2, unit: "개" },
    { name: "소금", amount: 1, unit: "꼬집", staple: true },
  ],
  steps: ["찐다."],
};

const kimchiRice: Recipe = {
  id: "kimchi-rice",
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
};

const stew: Recipe = {
  id: "stew",
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
};

const pasta: Recipe = {
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
};

const slow: Recipe = {
  id: "slow",
  name: "닭볶음탕",
  cuisine: "한식",
  minutes: 40,
  baseServings: 1,
  required: ["chicken"],
  ingredients: [{ name: "닭고기", amount: 200, unit: "g" }],
  steps: ["끓인다."],
};

const fixtures: Recipe[] = [saltOnly, eggSteam, kimchiRice, stew, pasta, slow];

describe("recommend", () => {
  it("고른 재료가 없으면 빈 배열이다", () => {
    expect(
      recommend(
        { selectedIds: [], customNames: [], timeFilter: "전체", servings: 1 },
        fixtures,
      ),
    ).toEqual([]);
  });

  it("기본 조미료만 필요한 요리는 조미료를 체크하지 않아도 가능이다", () => {
    const results = recommend(
      { selectedIds: ["egg"], customNames: [], timeFilter: "전체", servings: 1 },
      fixtures,
    );
    const soup = results.find((row) => row.recipe.id === "salt-soup");
    const egg = results.find((row) => row.recipe.id === "egg-steam");
    expect(soup?.status).toBe("가능");
    expect(egg?.status).toBe("가능");
  });

  it("필수 재료를 모두 고르면 가능, 하나면 하나부족, 둘 이상이면 빠진다", () => {
    const complete = recommend(
      { selectedIds: ["kimchi", "rice"], customNames: [], timeFilter: "전체", servings: 1 },
      fixtures,
    );
    expect(complete.find((row) => row.recipe.id === "kimchi-rice")?.status).toBe("가능");
    expect(complete.find((row) => row.recipe.id === "stew")).toMatchObject({
      status: "하나부족",
      missingName: "돼지고기",
    });
    expect(complete.find((row) => row.recipe.id === "pasta")).toBeUndefined();

    const oneMissing = recommend(
      { selectedIds: ["kimchi"], customNames: [], timeFilter: "전체", servings: 1 },
      fixtures,
    );
    expect(oneMissing.find((row) => row.recipe.id === "kimchi-rice")).toMatchObject({
      status: "하나부족",
      missingName: "밥",
    });
    expect(oneMissing.find((row) => row.recipe.id === "stew")).toMatchObject({
      status: "하나부족",
      missingName: "돼지고기",
    });
  });

  it("직접 입력 이름과 별칭도 체크와 같이 매칭된다", () => {
    const byAlias = recommend(
      { selectedIds: [], customNames: ["달걀"], timeFilter: "전체", servings: 1 },
      fixtures,
    );
    expect(byAlias.find((row) => row.recipe.id === "egg-steam")?.status).toBe("가능");

    const byCustom = recommend(
      {
        selectedIds: ["kimchi"],
        customNames: ["햇반"],
        timeFilter: "전체",
        servings: 1,
      },
      fixtures,
    );
    expect(byCustom.find((row) => row.recipe.id === "kimchi-rice")?.status).toBe("가능");
  });

  it("15분과 30분 필터가 조리 시간으로 걸러진다", () => {
    const query = {
      selectedIds: ["chicken", "kimchi", "pork", "egg"],
      customNames: [],
      servings: 1 as const,
    };
    const quick = recommend({ ...query, timeFilter: "15분" }, fixtures);
    expect(quick.map((row) => row.recipe.id)).not.toContain("stew");
    expect(quick.map((row) => row.recipe.id)).not.toContain("slow");
    expect(quick.map((row) => row.recipe.id)).toContain("egg-steam");

    const halfHour = recommend({ ...query, timeFilter: "30분" }, fixtures);
    expect(halfHour.map((row) => row.recipe.id)).toContain("stew");
    expect(halfHour.map((row) => row.recipe.id)).not.toContain("slow");

    const all = recommend({ ...query, timeFilter: "전체" }, fixtures);
    expect(all.map((row) => row.recipe.id)).toContain("slow");
  });

  it("가능이 하나부족보다 앞이고, 같은 안에서는 짧은 시간·가나다 순이다", () => {
    const results = recommend(
      {
        selectedIds: ["egg", "kimchi", "rice"],
        customNames: [],
        timeFilter: "전체",
        servings: 1,
      },
      fixtures,
    );
    const statuses = results.map((row) => row.status);
    const firstMissing = statuses.indexOf("하나부족");
    const lastPossible = statuses.lastIndexOf("가능");
    expect(firstMissing).toBeGreaterThan(lastPossible);

    const possible = results.filter((row) => row.status === "가능");
    const minutes = possible.map((row) => row.recipe.minutes);
    expect(minutes).toEqual([...minutes].sort((a, b) => a - b));
  });

  it("인분은 표시 양만 곱하고 매칭은 바꾸지 않는다", () => {
    const one = recommend(
      { selectedIds: ["egg"], customNames: [], timeFilter: "전체", servings: 1 },
      fixtures,
    );
    const two = recommend(
      { selectedIds: ["egg"], customNames: [], timeFilter: "전체", servings: 2 },
      fixtures,
    );
    const four = recommend(
      { selectedIds: ["egg"], customNames: [], timeFilter: "전체", servings: 4 },
      fixtures,
    );
    const egg1 = one.find((row) => row.recipe.id === "egg-steam");
    const egg2 = two.find((row) => row.recipe.id === "egg-steam");
    const egg4 = four.find((row) => row.recipe.id === "egg-steam");
    expect(egg1?.status).toBe("가능");
    expect(egg2?.status).toBe("가능");
    expect(egg4?.status).toBe("가능");
    expect(egg1?.ingredients[0]?.amount).toBe(2);
    expect(egg2?.ingredients[0]?.amount).toBe(4);
    expect(egg4?.ingredients[0]?.amount).toBe(8);
  });
});
