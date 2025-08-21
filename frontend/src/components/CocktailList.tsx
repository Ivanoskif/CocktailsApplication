import React from "react";
import type { Cocktail } from "../types";

type Props = {
  items: Cocktail[];
  onEdit: (c: Cocktail) => void;
  onDelete: (id: string) => Promise<void> | void;
  onToggleFavorite: (c: Cocktail) => Promise<void> | void;
};

export default function CocktailList({
  items,
  onEdit,
  onDelete,
  onToggleFavorite,
}: Props) {
  return (
    <ul>
      {items.map((c) => (
        <li key={c.id} style={{ marginBottom: 6 }}>
          <b>{c.name}</b> ({c.category}) {c.alcoholic ? "" : "🍹 (non-alcoholic)"}{" "}
          {c.isFavorite && "★"} {c.rating ? `— ${c.rating}/5` : ""}
          <button style={{ marginLeft: 8 }} onClick={() => onEdit(c)}>
            Edit
          </button>
          <button style={{ marginLeft: 6 }} onClick={() => onDelete(c.id)}>
            Delete
          </button>
          <button style={{ marginLeft: 6 }} onClick={() => onToggleFavorite(c)}>
            {c.isFavorite ? "Unfavorite" : "Favorite"}
          </button>
        </li>
      ))}
    </ul>
  );
}
