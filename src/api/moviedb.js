import axios from "axios";
import { Image } from 'react-native';
 
const apikey = '35562410e881922b673d32d47cec886d';
const baseURL = 'https://api.themoviedb.org/3'

const trendingMoviesEndpoint =`${baseURL}/trending/movie/day?api_key=${apikey}`
const topratedMoviesEndpoint =`${baseURL}/movie/top_rated?api_key=${apikey}`
const upcomingMoviesEndpoint =`${baseURL}/movie/upcoming?api_key=${apikey}`
const searchMoviesEndpoint = `${baseURL}/search/movie?api_key=${apikey}`
const trendingAllEndpoint = `${baseURL}/trending/all/day?api_key=${apikey}`




const movieDetailsEndpoint = id => `${baseURL}/movie/${id}?api_key=${apikey}`
const movieCreditsEndpoint = id => `${baseURL}/movie/${id}/credits?api_key=${apikey}`
const movieSimilarEndpoint = id => `${baseURL}/movie/${id}/similar?api_key=${apikey}`
const personDetailsEndpoint= id => `${baseURL}/person/${id}?api_key=${apikey}`
const personMoviesEndpoint = id => `${baseURL}/person/${id}/movie_credits?api_key=${apikey}`
const movieVideoEndpoint  = id => `${baseURL}/movie/${id}/videos?api_key=${apikey}`




export const imagew500 = path=> path? `https://image.tmdb.org/t/p/w500/${path}`:null;
export const imagew800 = path=> path? `https://image.tmdb.org/t/p/original/${path}`:null;
export const imagew342 = path=> path? `https://image.tmdb.org/t/p/w342/${path}`:null;
export const imagew185 = path=> path? `https://image.tmdb.org/t/p/w185/${path}`:null;



export const fallbackMoviePoster = Image.resolveAssetSource(
  require('../assets/images/notavailable.png')
).uri;


export const fallbackMoviePersonURI = Image.resolveAssetSource(
  require('../assets/images/profile2.jpg')
).uri;




export const fallbackMoviePerson = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';

const apiCall = async (endpoint, params) => {
    const options = {
      method: 'GET',
      url: endpoint,
      params: params ? params : {},
      timeout: 30000, 
      headers: {
        accept: 'application/json',
        Authorization: '35562410e881922b673d32d47cec886d',
      },
    };
  
    try {
      const response = await axios.request(options); 
      
      return response.data;
    } catch (error) {
      console.error('API request failed:', error);
      return null;
    }
  };

export const fetchtrendingMoviesEndpoint=()=>{
    return apiCall(trendingMoviesEndpoint);
}

export const fetchupcomingMoviesEndpoint=()=>{
    return apiCall(upcomingMoviesEndpoint);
}

export const fetchtopratedMoviesEndpoint=()=>{
    return apiCall(topratedMoviesEndpoint);
}

export const fetchMovieDetailsEndpoint=(id)=>{
  return apiCall(movieDetailsEndpoint(id));
}

export const fetchSimilarMoviesEndpoint=(id)=>{
  return apiCall(movieSimilarEndpoint(id));
}

export const fetchMovieCreditsEndpoint=(id)=>{
  return apiCall(movieCreditsEndpoint(id));
}

export const fetchPersonDetailsEndpoint=(id)=>{
  return apiCall(personDetailsEndpoint(id));
}
export const fetchPersonMoviesEndpoint=(id)=>{
  return apiCall(personMoviesEndpoint(id));
}

export const searchMovies=(params)=>{
  return apiCall(searchMoviesEndpoint, params);
}

export const fetchMovieVideo =( id) =>{
  return apiCall( movieVideoEndpoint(id) );


}
export const trendingAll=()=>{
  return apiCall(trendingAllEndpoint);
}