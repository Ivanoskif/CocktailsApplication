import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import type { Cocktail } from "./types";
import { listCocktails, deleteCocktail, toggleFavorite } from "./api";
import ListPage from "./pages/ListPage";
import AddPage from "./pages/AddPage";

export default function App() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  const load = async () => setCocktails(await listCocktails());
  useEffect(() => { load(); }, []);

  const onDelete = async (id: string) => { await deleteCocktail(id); await load(); }
  const onToggleFavorite = async (c: Cocktail) => { await toggleFavorite(c); await load(); }

  return (
    <>
      <header className="header">
        <nav className="nav container">
          <Link to="/" style={{textDecoration:'none', color:'inherit'}}>
            <span className="brand">🍹 Cocktails</span>
          </Link>
          <span className="badge">FastAPI · React · MongoDB</span>
          <div style={{marginLeft:'auto', display:'flex', gap:8}}>
            <Link to="/" className="btn ghost">Home</Link>
            <Link to="/new" className="btn primary">Add Cocktail</Link>
          </div>
        </nav>
      </header>

      <main className="container" style={{paddingTop:24}}>
        <Routes>
          <Route path="/" element={
            <ListPage
              items={cocktails}
              onDelete={onDelete}
              onToggleFavorite={onToggleFavorite}
            />
          } />
          <Route path="/new" element={<AddPage />} />
        </Routes>
      </main>
    </>
  );
}
