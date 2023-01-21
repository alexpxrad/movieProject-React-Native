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
      `${apiUrl}/movie/upcoming?${apiKey}`);
     return resp.data.results 
  };

  // Get Science Fiction Movie 
export const getPopularTv = async () => {
    const resp = await axios.get(
      `${apiUrl}/discover/movie?${apiKey}&with_genres=878`);
     return resp.data.results 
  };

 // Get Family Movies
export const getFamilyMovies = async () => {
    const resp = await axios.get(
      `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`);
     return resp.data.results 
  };

  // Get Documentaries
export const getDocumentaryMovies = async () => {
    const resp = await axios.get(
      `${apiUrl}/discover/movie?${apiKey}&with_genres=99`);
     return resp.data.results 
  };

  //Get Services
  export const getMovie = async (id) => {
    const resp = await axios.get(
      `${apiUrl}/movie/${id}?${apiKey}`,);
     return resp.data 
  };