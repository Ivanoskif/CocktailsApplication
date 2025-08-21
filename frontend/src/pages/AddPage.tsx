import React from "react";
import { useNavigate, Link } from "react-router-dom";
import CocktailForm from "../components/CocktailForm";
import type { CocktailIn } from "../types";
import { createCocktail } from "../api";

export default function AddPage() {
  const nav = useNavigate();

  const onSave = async (data: CocktailIn) => {
    await createCocktail(data);
    nav("/"); // назад на листата по додавање
  };

  return (
    <div className="grid">
      <div className="card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <h2 style={{margin:0}}>Add Cocktail</h2>
          <Link to="/" className="btn ghost">← Back</Link>
        </div>
        <CocktailForm onSave={onSave} editingId={null} />
      </div>
    </div>
  );
}
