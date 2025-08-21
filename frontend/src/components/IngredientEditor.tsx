import React, { useState } from "react";
import type { Ingredient } from "../types";

type Props = { value: Ingredient[]; onChange: (next: Ingredient[]) => void; }

export default function IngredientEditor({ value, onChange }: Props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [unit, setUnit] = useState("ml");

  const add = () => {
    if (!name.trim()) return;
    onChange([...value, { name, amount: amount || 0, unit: unit || "" }]);
    setName(""); setAmount(0); setUnit("ml");
  };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div>
      <h3 style={{marginTop:0}}>Ingredients</h3>
      <div className="grid" style={{gridTemplateColumns:'2fr 120px 110px auto', gap:8, marginBottom:8}}>
        <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input className="input" type="number" value={Number.isNaN(amount)?0:amount} onChange={e => setAmount(parseFloat(e.target.value))} placeholder="Amount" />
        <input className="input" value={unit} onChange={e => setUnit(e.target.value)} placeholder="Unit" />
        <button className="btn ghost" onClick={add}>Add</button>
      </div>
      <ul className="list">
        {value.map((ing,i)=>(
          <li key={`${ing.name}-${i}`} className="item">
            <div>{ing.name} — {ing.amount} {ing.unit}</div>
            <div className="toolbar">
              <button className="btn ghost" onClick={()=>remove(i)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
