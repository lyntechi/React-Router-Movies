import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./Movies/MovieList";
import SavedList from "./Movies/SavedList";
import Movie from "./Movies/Movie";
import MovieCard from './Movies/MovieCard'
import { Route, Link, Switch, NavLink } from "react-router-dom";
const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:5000/api/movies")
        .then((response) => {
          console.log("this is the response from the API", response);
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Server Error", error);
        });
    };
    getMovies();
  }, []);

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
     
      <div>
        <Switch>
          <Route path="/movies/:id">
          <Movie />
          </Route>
          <Route path="/">
            <MovieList movies={movieList} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;

// * [ ] Make it so that the card in `MovieList`
//  is a link, this should direct the user to the
//  `/movies/{id of movie here}` URL, where `:id` is
//  the id of the individual movie.
// * [ ] When a user clicks on a movie card they
//  should be taken to `/movies/{id of movie here}`
//   to see the details for the selected movie.
// * [ ] You will need to modify line 13 of `Movie.js`
//  in order to accept the correct id for the movie
//   selected.
// * [ ] Add functionality so the `Home` button on the
// `SavedList` component navigates back to home.
// * [ ] You should now be able to navigate back and
//  forth between the individual movies and the home
//   screen.
