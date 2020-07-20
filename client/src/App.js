import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './Movies/MovieList'
import { Route, Switch } from "react-router-dom";
import SavedList from './Movies/SavedList';
import Movie from './Movies/Movie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
//  console.log('this is movielist',movieList)
  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
      <Switch>
      <Route path="/movies/:id">
      <Movie />
      </Route>
      <Route path="/">
        <MovieList movies={movieList}/>
        </Route>
     
     
      </Switch>
    
     
       
        

     
    </div>
  );
};

export default App;
