import React, { useEffect, useState } from "react";
import type { CocktailIn } from "../types";
import IngredientEditor from "./IngredientEditor";

type Props = {
  initial?: CocktailIn;
  editingId: string | null;
  onSave: (data: CocktailIn, id?: string | null) => Promise<void> | void;
  onCancel?: () => void;
};

const DEFAULT_DATA: CocktailIn = {
  name: "", category: "Classic", alcoholic: true, isFavorite: false,
  rating: 5, ingredients: [], instructions: "",
};

export default function CocktailForm({ initial, editingId, onSave, onCancel }: Props) {
  const [data, setData] = useState<CocktailIn>(initial ?? DEFAULT_DATA);
  useEffect(() => { setData(initial ?? DEFAULT_DATA); }, [initial?.name]);

  const change = (patch: Partial<CocktailIn>) => setData(d => ({...d, ...patch}));
  const submit = async () => { await onSave(data, editingId); };

  return (
    <div className="grid two">
      <div className="grid">
        <input className="input" value={data.name} onChange={e=>change({name:e.target.value})} placeholder="Name" />
        <input className="input" value={data.category} onChange={e=>change({category:e.target.value})} placeholder="Category" />
        <label className="label">
          <input type="checkbox" checked={data.alcoholic} onChange={e=>change({alcoholic:e.target.checked})}/> Alcoholic
        </label>
        <label className="label">
          <input type="checkbox" checked={data.isFavorite} onChange={e=>change({isFavorite:e.target.checked})}/> Favorite
        </label>
        <label className="label">
          Rating:
          <input className="input" type="number" min={1} max={5}
            value={data.rating ?? ""} onChange={e=>change({rating: e.target.value? parseInt(e.target.value): undefined})}/>
        </label>
        <textarea className="textarea" value={data.instructions} onChange={e=>change({instructions:e.target.value})} placeholder="Instructions"/>
        <div className="toolbar">
          <button className="btn primary" onClick={submit}>{editingId ? "Update" : "Create"}</button>
          {editingId && onCancel && <button className="btn ghost" onClick={onCancel}>Cancel</button>}
        </div>
      </div>

      <div>
        <div className="card"><IngredientEditor value={data.ingredients} onChange={(ingredients)=>change({ingredients})}/></div>
      </div>
    </div>
  );
}
