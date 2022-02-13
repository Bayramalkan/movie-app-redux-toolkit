import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/api/movieApi";
import { APIKey } from "../../common/api/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    // const movieText = "Harry";
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${term}&type=movie`
    );

    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    // const seriesText = "Friends";
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${term}&type=series`
    );

    return response.data;
  }
);

export const fetchAsyncMovieOrShowsDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowsDetail",
  async (id) => {
    const response = await movieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`);

    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, action) => {
      state.movies = action.payload;
    },
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, action) => {
      console.log("Fetched Successfully");
      state.movies = action.payload;
      //return { ...state, movies: action.payload };
    },

    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected!");
    },

    [fetchAsyncShows.fulfilled]: (state, action) => {
      console.log("Fetched Successfully");
      state.shows = action.payload;
      //return { ...state, shows: action.payload };
    },

    [fetchAsyncMovieOrShowsDetail.fulfilled]: (state, action) => {
      console.log("Fetched Successfully");
      state.selectedMovieOrShow = action.payload;
      //return { ...state, shows: action.payload };
    },
  },
});

export const { addMovies, removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;

export default movieSlice.reducer;
