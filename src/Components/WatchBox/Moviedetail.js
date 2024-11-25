import React, { useEffect, useState } from "react";
import Loader from "../../utils/Loader";
import Starrating from "../../Starrating";

function Moviedetail({ selectedid, Onclosemovie, Onaddwatchlist, watched }) {
  const [movie, setMovie] = useState({});
  const [isloading, setisLoading] = useState(false);
  const [userrating, setUserrating] = useState("");
  const key = "db7f839d";

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedid);

  const userRating = watched.find(
    (movie) => movie.imdbID === selectedid
  )?.userrating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Release: release,
    Actor: actor,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchmovie = {
      imdbID: selectedid,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(" ").at(0),
      userrating,
      key,
    };
    Onaddwatchlist(newWatchmovie);
  }

  useEffect(
    function () {
      async function getmovieslist() {
        setisLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&i=${selectedid}`
        );
        const data = await res.json();
        setMovie(data);
        setisLoading(false);
      }
      getmovieslist();
    },
    [selectedid]
  );

  /// Changing the title of the movie
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "UsePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={Onclosemovie}>
              -
            </button>
            <img src={poster} alt={`poster of movie ${title}`}></img>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {release} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            {/*  Star Ratting */}
            <div className="rating">
              {!isWatched ? (
                <>
                  <Starrating
                    maxrate={10}
                    size={"2rem"}
                    onSetrating={setUserrating}
                  />
                  {userrating > 1 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>Your rated with movie {userRating}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actor}</p>
            <p>Director by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
export default Moviedetail;
