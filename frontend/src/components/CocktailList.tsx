import React from "react";
import type { Cocktail } from "../types";

type Props = {
  items: Cocktail[];
  onDelete: (id: string) => Promise<void> | void;
  onToggleFavorite: (c: Cocktail) => Promise<void> | void;
};

const Rating = ({ value }: { value?: number }) => {
  if (!value) return null;
  const stars = Array.from({ length: 5 }, (_, i) => (i < value ? "★" : "☆")).join("");
  return <span className="rating" aria-label={`Rating ${value}/5`}>{stars}</span>;
};

export default function CocktailList({ items, onDelete, onToggleFavorite }: Props) {
  if (!items.length) {
    return <div className="card">Empty! Add cocktail.</div>;
  }

  return (
    <div className="cards-grid">
      {items.map((c) => (
        <article key={c.id} className="card cocktail">
          <header className="card-head">
            <h3 className="card-title">
              {c.name} {c.isFavorite && <span className="star">★</span>}
            </h3>
            <div className="chips">
              <span className="chip">{c.category}</span>
              {!c.alcoholic && <span className="chip warn">Mocktail</span>}
              <Rating value={c.rating} />
            </div>
          </header>

          <section className="card-section">
            <h4>Ingredients</h4>
            <ul className="ing-list">
              {c.ingredients?.length ? (
                c.ingredients.map((ing, i) => (
                  <li key={i}>
                    {ing.name} — {ing.amount} {ing.unit}
                  </li>
                ))
              ) : (
                <li className="kicker">No ingredients</li>
              )}
            </ul>
          </section>

          <section className="card-section">
            <h4>Instructions</h4>
            <p className="instructions">
              {c.instructions || <span className="kicker">No instructions</span>}
            </p>
          </section>

          <footer className="toolbar">
            <button className="btn ghost" onClick={() => onToggleFavorite(c)}>
              {c.isFavorite ? "Unfavorite" : "Favorite"}
            </button>
            <button className="btn ghost" onClick={() => onDelete(c.id)}>Delete</button>
          </footer>
        </article>
      ))}
    </div>
  );
}
