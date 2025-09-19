import React from "react";
import { Link } from "react-router-dom";
import CocktailList from "../components/CocktailList";
import type { Cocktail } from "../types";

type Props = {
  items: Cocktail[];
  onEdit?: (c: Cocktail) => void;
  onDelete: (id: string) => Promise<void> | void;
  onToggleFavorite: (c: Cocktail) => Promise<void> | void;
};

export default function ListPage({ items, onDelete, onToggleFavorite }: Props) {
  return (
    <div className="grid">
      <div className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h2 style={{margin:'0 0 6px'}}>All Cocktails</h2>
        </div>
        <Link to="/new" className="btn primary">+ Add</Link>
      </div>

      <CocktailList items={items} onDelete={onDelete} onToggleFavorite={onToggleFavorite} />

    </div>
  );
}
