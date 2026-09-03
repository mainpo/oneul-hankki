import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from "react";
import { CHECKLIST, foldIngredientName, STAPLES } from "./domain/catalog";
import { recommend } from "./domain/recommend";
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

  const open = results.find((row) => row.recipe.id === openId) ?? null;
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
                {option}
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
                {option}인분
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
                  {item.name}
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
                  <span>{name}</span>
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
            <h2 id="results-heading">이걸로 되는 저녁</h2>
            {hasIngredients ? (
              <p className="count">
                가능 {possibleCount} · 하나 부족 {results.length - possibleCount}
              </p>
            ) : null}
          </div>
          {!hasIngredients ? (
            <p className="empty">재료를 고르면 오늘 한 끼가 여기 모입니다. 계란·김치·대파부터 눌러 보세요.</p>
          ) : results.length === 0 ? (
            <p className="empty">
              이 조합으로는 지금 만들 수 있는 집밥이 없습니다. 재료를 더 고르거나 시간 칸을 넓혀 보세요.
            </p>
          ) : (
            <ul className="recipes">
              {results.map((row) => (
                <li key={row.recipe.id}>
                  <button
                    type="button"
                    className="recipe-row"
                    aria-expanded={openId === row.recipe.id}
                    onClick={() =>
                      setOpenId((current) =>
                        current === row.recipe.id ? null : row.recipe.id,
                      )
                    }
                  >
                    <span className="recipe-name">{row.recipe.name}</span>
                    <span className="meta">
                      <span>{row.recipe.minutes}분</span>
                      <span>{row.recipe.cuisine}</span>
                      {row.status === "하나부족" && row.missingName ? (
                        <span className="missing">{row.missingName}만 있으면</span>
                      ) : (
                        <span className="ready">지금 가능</span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {open ? <RecipePanel row={open} servings={servings} onClose={() => setOpenId(null)} /> : null}
    </div>
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
