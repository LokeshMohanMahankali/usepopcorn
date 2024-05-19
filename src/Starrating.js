import React from "react";

export default function Starrating({ maxrate }) {
  return (
    <div>
      <div>
        {Array.from({ length: maxrate }, (_, i) => (
          <span key={i}>s{i + 1}</span>
        ))}
      </div>
    </div>
  );
}
