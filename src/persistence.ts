import type { SavedState, Servings, TimeFilter } from "./domain/types";

const KEY = "oneul-hankki:v1";

const DEFAULT_STATE: SavedState = {
  selectedIds: [],
  customNames: [],
  timeFilter: "전체",
  servings: 1,
};

function isTimeFilter(value: unknown): value is TimeFilter {
  return value === "15분" || value === "30분" || value === "전체";
}

function isServings(value: unknown): value is Servings {
  return value === 1 || value === 2 || value === 4;
}

export function loadState(): SavedState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<SavedState>;
    return {
      selectedIds: Array.isArray(parsed.selectedIds)
        ? parsed.selectedIds.filter((id): id is string => typeof id === "string")
        : [],
      customNames: Array.isArray(parsed.customNames)
        ? parsed.customNames.filter((name): name is string => typeof name === "string")
        : [],
      timeFilter: isTimeFilter(parsed.timeFilter) ? parsed.timeFilter : "전체",
      servings: isServings(parsed.servings) ? parsed.servings : 1,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: SavedState): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}
