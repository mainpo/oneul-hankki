export type Cuisine = "한식" | "집양식";
export type TimeFilter = "15분" | "30분" | "전체";
export type Servings = 1 | 2 | 4;
export type MatchStatus = "가능" | "하나부족";

export type Ingredient = {
  id: string;
  name: string;
  aliases: string[];
};

export type DisplayIngredient = {
  name: string;
  amount: number | null;
  unit: string;
  staple?: boolean;
};

export type Recipe = {
  id: string;
  name: string;
  cuisine: Cuisine;
  minutes: number;
  baseServings: 1;
  required: string[];
  ingredients: DisplayIngredient[];
  steps: string[];
};

export type RecommendQuery = {
  selectedIds: string[];
  customNames: string[];
  timeFilter: TimeFilter;
  servings: Servings;
};

export type Recommendation = {
  recipe: Recipe;
  status: MatchStatus;
  missingName: string | null;
  ingredients: DisplayIngredient[];
};

export type SavedState = {
  selectedIds: string[];
  customNames: string[];
  timeFilter: TimeFilter;
  servings: Servings;
};
