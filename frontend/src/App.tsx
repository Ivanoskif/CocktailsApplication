import React, { useEffect, useState } from "react";
import type { Cocktail, CocktailIn } from "./types";
import {
  listCocktails,
  createCocktail,
  updateCocktail,
  deleteCocktail,
  toggleFavorite,
} from "./api";
import CocktailForm from "./components/CocktailForm";
import CocktailList from "./components/CocktailList";

export default function App() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<CocktailIn | undefined>();

  const load = async () => {
    const data = await listCocktails();
    setCocktails(data);
  };
  useEffect(() => {
    load();
  }, []);

  const onSave = async (data: CocktailIn, id?: string | null) => {
    if (id) await updateCocktail(id, data);
    else await createCocktail(data);
    await load();
    cancelEdit();
  };

  const startEdit = (c: Cocktail) => {
    setEditingId(c.id);
    const { id, ...rest } = c;
    setEditingData(rest);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingData(undefined);
  };

  const onDelete = async (id: string) => {
    await deleteCocktail(id);
    await load();
  };

  const onToggleFavorite = async (c: Cocktail) => {
    await toggleFavorite(c);
    await load();
  };

  return (
    <div style={{ fontFamily: "system-ui", margin: 24, maxWidth: 1000 }}>
      <h1>Cocktails</h1>

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "1fr 1fr",
          alignItems: "start",
        }}
      >
        <CocktailForm
          initial={editingData}
          editingId={editingId}
          onSave={onSave}
          onCancel={cancelEdit}
        />

        <div>
          <h2>All Cocktails</h2>
          <CocktailList
            items={cocktails}
            onEdit={startEdit}
            onDelete={onDelete}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      </div>
    </div>
  );
}
