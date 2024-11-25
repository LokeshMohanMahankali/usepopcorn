import React from "react";
import Watchmovie from "./Watchmovie";

function Watchmovielist({ watched, onDeletwatch }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Watchmovie
          movie={movie}
          key={movie.imdbID}
          onDeletwatch={onDeletwatch}
        />
      ))}
    </ul>
  );
}

export default Watchmovielist;
