import React from "react";
import Watchedsummary from "./Watchedsummary";
import Watchmovielist from "./Watchmovielist";

function WatchBox() {
  const [watched, setWatched] = useState([]);

  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>

      {isOpen2 && (
        <>
          <Watchedsummary watched={watched} />

          <Watchmovielist watched={watched} />
        </>
      )}
    </div>
  );
}

export default WatchBox;
