import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from "react";
import { CHECKLIST, foldIngredientName, STAPLES } from "./domain/catalog";
import { describeRecipe, recommend } from "./domain/recommend";
import { RECIPES } from "./domain/recipes";
import { searchRecipes } from "./domain/search";
import type { Recommendation, Servings, TimeFilter } from "./domain/types";
import { loadState, saveState } from "./persistence";

const TIME_OPTIONS: TimeFilter[] = ["15분", "30분", "전체"];
const SERVING_OPTIONS: Servings[] = [1, 2, 4];

function formatAmount(amount: number | null, unit: string): string {
  if (amount === null) return unit || "약간";
  const shown = Number.isInteger(amount) ? String(amount) : String(amount);
  return `${shown}${unit}`;
}

export function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [customNames, setCustomNames] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("전체");
  const [servings, setServings] = useState<Servings>(1);
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [showCatalog, setShowCatalog] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadState();
    setSelectedIds(saved.selectedIds);
    setCustomNames(saved.customNames);
    setTimeFilter(saved.timeFilter);
    setServings(saved.servings);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveState({ selectedIds, customNames, timeFilter, servings });
  }, [hydrated, selectedIds, customNames, timeFilter, servings]);

  const results = useMemo(
    () => recommend({ selectedIds, customNames, timeFilter, servings }),
    [selectedIds, customNames, timeFilter, servings],
  );
  const searching = search.trim().length > 0;
  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const query = { selectedIds, customNames, timeFilter, servings };
    return searchRecipes(search).map((recipe) => describeRecipe(recipe, query));
  }, [search, selectedIds, customNames, timeFilter, servings]);
  const catalogRows = useMemo(() => {
    const query = { selectedIds, customNames, timeFilter, servings };
    return [...RECIPES]
      .sort((a, b) => a.name.localeCompare(b.name, "ko"))
      .map((recipe) => describeRecipe(recipe, query));
  }, [selectedIds, customNames, timeFilter, servings]);
  const koreanCatalog = catalogRows.filter((row) => row.recipe.cuisine === "한식");
  const westernCatalog = catalogRows.filter((row) => row.recipe.cuisine === "집양식");

  const visible = searching ? searchResults : results;
  const open =
    (searching
      ? searchResults
      : showCatalog
        ? catalogRows
        : results
    ).find((row) => row.recipe.id === openId) ?? null;
  const hasIngredients = selectedIds.length > 0 || customNames.length > 0;
  const possibleCount = results.filter((row) => row.status === "가능").length;

  function toggleId(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function addCustom(event: FormEvent) {
    event.preventDefault();
    const folded = foldIngredientName(draft);
    if (folded.type === "empty") return;
    if (folded.type === "id") {
      setSelectedIds((current) =>
        current.includes(folded.id) ? current : [...current, folded.id],
      );
    } else {
      setCustomNames((current) =>
        current.includes(folded.name) ? current : [...current, folded.name],
      );
    }
    setDraft("");
  }

  function clearAll() {
    setSelectedIds([]);
    setCustomNames([]);
    setOpenId(null);
  }

  return (
    <div className="page">
      <header className="masthead">
        <p className="eyebrow">냉장고 문</p>
        <h1>오늘 한 끼</h1>
        <p className="lede">퇴근하고 문을 열었을 때, 지금 있는 걸로 고른다.</p>
      </header>

      <section className="toolbar" aria-label="시간과 인분">
        <fieldset>
          <legend>시간</legend>
          <div className="segment">
            {TIME_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={timeFilter === option}
                onClick={() => setTimeFilter(option)}
              >
                {timeFilter === option ? `✓ ${option}` : option}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>인분</legend>
          <div className="segment">
            {SERVING_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={servings === option}
                onClick={() => setServings(option)}
              >
                {servings === option ? `✓ ${option}인분` : `${option}인분`}
              </button>
            ))}
          </div>
        </fieldset>
      </section>

      <div className="layout">
        <section className="fridge" aria-labelledby="fridge-heading">
          <div className="section-head">
            <h2 id="fridge-heading">지금 있는 것</h2>
            <button type="button" className="text-btn" onClick={clearAll}>
              재료 비우기
            </button>
          </div>
          <p className="hint">
            {STAPLES.slice(0, 6).join("·")} 같은 기본 조미료는 있는 것으로 칩니다.
          </p>
          <ul className="magnets">
            {CHECKLIST.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="magnet"
                  aria-pressed={selectedIds.includes(item.id)}
                  style={{ "--tilt": `${((index % 5) - 2) * 0.4}deg` } as CSSProperties}
                  onClick={() => toggleId(item.id)}
                >
                  {selectedIds.includes(item.id) ? `✓ ${item.name}` : item.name}
                </button>
              </li>
            ))}
          </ul>
          <form className="add-form" onSubmit={addCustom}>
            <label htmlFor="custom-ingredient">목록에 없으면</label>
            <div className="add-row">
              <input
                id="custom-ingredient"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="오징어, 생크림…"
                autoComplete="off"
              />
              <button type="submit">넣기</button>
            </div>
          </form>
          {customNames.length > 0 ? (
            <ul className="custom-list">
              {customNames.map((name) => (
                <li key={name}>
                  <span>✓ {name}</span>
                  <button
                    type="button"
                    className="text-btn"
                    onClick={() =>
                      setCustomNames((current) => current.filter((item) => item !== name))
                    }
                  >
                    빼기
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        <section className="results" aria-labelledby="results-heading">
          <div className="section-head">
            <h2 id="results-heading">{searching ? "레시피 찾기" : "이걸로 되는 저녁"}</h2>
            {searching ? (
              <p className="count">{visible.length}개</p>
            ) : hasIngredients ? (
              <p className="count">
                가능 {possibleCount} · 하나 부족 {results.length - possibleCount}
              </p>
            ) : null}
          </div>
          <label className="search-label" htmlFor="recipe-search">
            저장된 레시피 검색
          </label>
          <div className="search-row">
            <input
              id="recipe-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="김치찌개, 계란, 파스타…"
              autoComplete="off"
            />
            {searching ? (
              <button type="button" onClick={() => setSearch("")}>
                지우기
              </button>
            ) : null}
          </div>
          <button
            type="button"
            className="catalog-toggle"
            aria-pressed={showCatalog}
            onClick={() => setShowCatalog((open) => !open)}
          >
            {showCatalog ? "✓ 전체 레시피 닫기" : `전체 레시피 보기 · ${RECIPES.length}개`}
          </button>
          {searching && visible.length === 0 ? (
            <p className="empty">
              “{search.trim()}”에 해당하는 레시피가 없습니다. 요리 이름이나 재료 이름으로 다시 찾아 보세요.
            </p>
          ) : searching ? (
            <RecipeList rows={visible} openId={openId} onToggle={setOpenId} />
          ) : showCatalog ? (
            <div className="catalog">
              <p className="hint">한식 {koreanCatalog.length}개 · 집양식 {westernCatalog.length}개. 눌러서 재료와 순서를 봅니다.</p>
              <h3>한식</h3>
              <RecipeList rows={koreanCatalog} openId={openId} onToggle={setOpenId} />
              <h3>집양식</h3>
              <RecipeList rows={westernCatalog} openId={openId} onToggle={setOpenId} />
            </div>
          ) : !hasIngredients ? (
            <p className="empty">
              재료를 고르거나, 위에서 요리 이름으로 찾아 보세요. 계란·김치·대파부터 눌러도 됩니다.
            </p>
          ) : results.length === 0 ? (
            <p className="empty">
              이 조합으로는 지금 만들 수 있는 집밥이 없습니다. 재료를 더 고르거나 시간 칸을 넓혀 보세요.
            </p>
          ) : (
            <RecipeList rows={visible} openId={openId} onToggle={setOpenId} />
          )}
        </section>
      </div>

      {open ? <RecipePanel row={open} servings={servings} onClose={() => setOpenId(null)} /> : null}
    </div>
  );
}

function statusLabel(row: Recommendation) {
  if (row.status === "가능") return <span className="ready">지금 가능</span>;
  if (row.status === "하나부족" && row.missingName) {
    return <span className="missing">{row.missingName}만 있으면</span>;
  }
  return null;
}

function RecipeList({
  rows,
  openId,
  onToggle,
}: {
  rows: Recommendation[];
  openId: string | null;
  onToggle: (id: string | null) => void;
}) {
  return (
    <ul className="recipes">
      {rows.map((row) => (
        <li key={row.recipe.id}>
          <button
            type="button"
            className={`recipe-row${openId === row.recipe.id ? " is-open" : ""}`}
            aria-expanded={openId === row.recipe.id}
            onClick={() => onToggle(openId === row.recipe.id ? null : row.recipe.id)}
          >
            <span className="recipe-name">{row.recipe.name}</span>
            <span className="meta">
              <span>{row.recipe.minutes}분</span>
              <span>{row.recipe.cuisine}</span>
              {statusLabel(row)}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function RecipePanel({
  row,
  servings,
  onClose,
}: {
  row: Recommendation;
  servings: Servings;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="scrim" onClick={onClose}>
      <article
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recipe-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header>
          <p className="eyebrow">
            {row.recipe.cuisine} · {row.recipe.minutes}분 · {servings}인분
          </p>
          <h2 id="recipe-title">{row.recipe.name}</h2>
          {row.status === "하나부족" && row.missingName ? (
            <p className="missing-note">{row.missingName}만 있으면 됩니다.</p>
          ) : null}
        </header>
        <section>
          <h3>재료</h3>
          <ul className="ingredients">
            {row.ingredients.map((item) => (
              <li key={`${item.name}-${item.unit}`}>
                <span>
                  {item.name}
                  {item.staple ? <em> 있다고 친 조미료</em> : null}
                </span>
                <span>{formatAmount(item.amount, item.unit)}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3>순서</h3>
          <ol className="steps">
            {row.recipe.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
        <button type="button" className="close" onClick={onClose}>
          닫기
        </button>
      </article>
    </div>
  );
}
