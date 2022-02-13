import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";

import { useDispatch } from "react-redux";
import {
  addMovies,
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // const fetchMovies = async () => {
    //   //console.log("The response from api: ", response);
    // };
    const movieText = "Avengers";
    const showText = "Avengers";
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));

    // fetchMovies();
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
