import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3/'
const apiKey = 'api_key=a1521d9bd36fc6acc3e34902d9d05208'
// Get Popular Movies
export const getPopularMovies = async () => {
    const resp = await axios.get(
      `${apiUrl}/movie/popular?${apiKey}`,);
     return resp.data.results 
  };

  // Get Upcoming Movies
export const getUpcomingMovies = async () => {
    const resp = await axios.get(
      `${apiUrl}/movie/upcoming?${apiKey}`,);
     return resp.data.results 
  };

  // Get Popular TV 
export const getPopularTv = async () => {
    const resp = await axios.get(
      `${apiUrl}/tv/popular?${apiKey}`,);
     return resp.data.results 
  };