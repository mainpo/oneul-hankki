import type { Ingredient } from "./types";

export const STAPLES = [
  "소금",
  "설탕",
  "후추",
  "간장",
  "식용유",
  "참기름",
  "마늘",
  "식초",
  "고추장",
  "된장",
  "고춧가루",
  "물",
] as const;

export const CHECKLIST: Ingredient[] = [
  { id: "egg", name: "계란", aliases: ["달걀", "계란후라이"] },
  { id: "kimchi", name: "김치", aliases: ["배추김치"] },
  { id: "green-onion", name: "대파", aliases: ["파", "쪽파"] },
  { id: "onion", name: "양파", aliases: [] },
  { id: "tofu", name: "두부", aliases: ["순두부"] },
  { id: "pork", name: "돼지고기", aliases: ["삼겹살", "목살", "돼지"] },
  { id: "beef", name: "소고기", aliases: ["소", "불고기감"] },
  { id: "chicken", name: "닭고기", aliases: ["닭", "닭가슴살", "닭다리"] },
  { id: "bacon", name: "베이컨", aliases: [] },
  { id: "ham", name: "햄", aliases: [] },
  { id: "spam", name: "스팸", aliases: [] },
  { id: "sausage", name: "소시지", aliases: ["소세지"] },
  { id: "carrot", name: "당근", aliases: [] },
  { id: "potato", name: "감자", aliases: [] },
  { id: "zucchini", name: "애호박", aliases: ["호박"] },
  { id: "broccoli", name: "브로콜리", aliases: [] },
  { id: "tomato", name: "토마토", aliases: [] },
  { id: "mushroom", name: "버섯", aliases: ["팽이버섯", "느타리", "표고"] },
  { id: "chili", name: "고추", aliases: ["청양고추", "풋고추"] },
  { id: "cucumber", name: "오이", aliases: [] },
  { id: "lettuce", name: "상추", aliases: [] },
  { id: "perilla", name: "깻잎", aliases: [] },
  { id: "paprika", name: "파프리카", aliases: [] },
  { id: "bean-sprout", name: "콩나물", aliases: [] },
  { id: "mung-sprout", name: "숙주", aliases: ["숙주나물"] },
  { id: "cheese", name: "치즈", aliases: ["모짜렐라", "슬라이스치즈"] },
  { id: "milk", name: "우유", aliases: [] },
  { id: "butter", name: "버터", aliases: [] },
  { id: "bread", name: "식빵", aliases: ["빵"] },
  { id: "rice", name: "밥", aliases: ["햇반", "쌀밥", "흰밥"] },
  { id: "spaghetti", name: "파스타면", aliases: ["스파게티면", "스파게티", "파스타"] },
  { id: "ramen", name: "라면", aliases: ["라면사리"] },
  { id: "tuna", name: "참치캔", aliases: ["참치"] },
  { id: "squid", name: "오징어", aliases: [] },
  { id: "shrimp", name: "새우", aliases: [] },
  { id: "crab-stick", name: "맛살", aliases: [] },
  { id: "yogurt", name: "요거트", aliases: ["요구르트", "그릭요거트"] },
];

const byId = new Map(CHECKLIST.map((item) => [item.id, item]));

export function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, "").toLowerCase();
}

export function ingredientById(id: string): Ingredient | undefined {
  return byId.get(id);
}

export function namesForIngredient(id: string): string[] {
  const item = byId.get(id);
  if (!item) return [];
  return [item.name, ...item.aliases];
}

export function findIngredientByName(raw: string): Ingredient | undefined {
  const needle = normalizeName(raw);
  if (!needle) return undefined;
  return CHECKLIST.find((item) =>
    [item.name, ...item.aliases].some((name) => normalizeName(name) === needle),
  );
}

export function foldIngredientName(
  raw: string,
): { type: "id"; id: string } | { type: "custom"; name: string } | { type: "empty" } {
  const name = raw.trim();
  if (!name) return { type: "empty" };
  const found = findIngredientByName(name);
  if (found) return { type: "id", id: found.id };
  return { type: "custom", name };
}

export function selectedNameSet(selectedIds: string[], customNames: string[]): Set<string> {
  const names = new Set<string>();
  for (const id of selectedIds) {
    for (const name of namesForIngredient(id)) {
      names.add(normalizeName(name));
    }
  }
  for (const custom of customNames) {
    names.add(normalizeName(custom));
  }
  return names;
}

export function ingredientIsSelected(
  ingredientId: string,
  selectedNames: Set<string>,
): boolean {
  return namesForIngredient(ingredientId).some((name) =>
    selectedNames.has(normalizeName(name)),
  );
}
