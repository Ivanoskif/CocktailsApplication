import React, { useState } from "react";
import type { Ingredient } from "../types";

type Props = {
  value: Ingredient[];
  onChange: (next: Ingredient[]) => void;
};

export default function IngredientEditor({ value, onChange }: Props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [unit, setUnit] = useState("ml");

  const add = () => {
    if (!name.trim()) return;
    onChange([...value, { name, amount: amount || 0, unit: unit || "" }]);
    setName("");
    setAmount(0);
    setUnit("ml");
  };

  const remove = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <h3>Ingredients</h3>
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <input
          style={{ flex: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          style={{ width: 80 }}
          type="number"
          value={Number.isNaN(amount) ? 0 : amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Amt"
        />
        <input
          style={{ width: 80 }}
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="Unit"
        />
        <button onClick={add}>Add</button>
      </div>

      <ul>
        {value.map((ing, i) => (
          <li key={`${ing.name}-${i}`}>
            {ing.name} — {ing.amount} {ing.unit}
            <button style={{ marginLeft: 8 }} onClick={() => remove(i)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
