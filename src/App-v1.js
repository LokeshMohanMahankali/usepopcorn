import { useCallback, useEffect, useRef, useState } from "react";
import StarRating from "./Starrating";
import Navbar from "./Components/Navbar/Navbar";
import Found from "./Components/Navbar/Found";
import Search from "./Components/Navbar/Search";
import Box from "./Components/ListBox/Box";
import Movieslist from "./Components/ListBox/Movieslist";
import Moviedetail from "./Components/WatchBox/Moviedetail";
import Loader from "./utils/Loader";
import Watchedsummary from "./Components/WatchBox/Watchedsummary";
import Watchmovielist from "./Components/WatchBox/Watchmovielist";
import Errormessage from "./utils/Errormessage";
import Main from "./utils/Main";
import { useLocalStorage } from "./UseLocalStorage";

const key = "db7f839d";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useLocalStorage([], "watched");
  const [isloading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedid, setSelectedid] = useState();

  function handleclick(id) {
    setSelectedid((selectedid) => (selectedid === id ? null : id));
  }

  function handleclose() {
    setSelectedid(null);
  }

  function handleaddwatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  // removed movie form the watchlist
  function handleremovemovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          handleclose();
          console.log("CLOSING");
        }
      }
      document.addEventListener("keyword", callback);

      return function () {
        document.addEventListener("keyword", callback);
      };
    },
    [handleclose]
  );

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setisLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          // When network was gone this error was reflected
          if (!res.ok)
            throw new Error(" Somting went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "false") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
          if (err.name !== "AbortErro") {
            console.log(err.message);
          }
        } finally {
          setisLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        setisLoading("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Found movies={movies} />
        <Search query={query} setQuery={setQuery} />
      </Navbar>
      <Main>
        <Box>
          {/* {isloading ? <Loader /> : <Movieslist movies={movies} />} */}
          {isloading && <Loader />}
          {!isloading && !error && (
            <Movieslist movies={movies} onSelectMovie={handleclick} />
          )}
          {error && <Errormessage message={error} />}
        </Box>

        <Box>
          {selectedid ? (
            <Moviedetail
              selectedid={selectedid}
              Onclosemovie={handleclose}
              Onaddwatchlist={handleaddwatched}
              watched={watched}
            />
          ) : (
            <>
              <Watchedsummary watched={watched} />
              <Watchmovielist
                watched={watched}
                onDeletwatch={handleremovemovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
