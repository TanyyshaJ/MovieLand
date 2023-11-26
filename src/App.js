import './App.css';
import { useEffect, useState } from 'react';
import SearchIcon from './search.svg'
import MovieCard from './Components/MovieCard/MovieCard';

const API_URL = "http://www.omdbapi.com?apikey=7e2de78f"

const movie1 ={Title: 'Spiderman and Grandma', Year: '2009'}

function App() {

  const [movies, setMovies ] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) =>{
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search)
  }

  useEffect(()=>{
    searchMovies('Spiderman')
  },[]); //an empty dependent array as the second argument to determine that the function only runs once, if dependencies are provided in the array, the function will re-run if they are fulfilled
  return (
    <div className="app">
      <h1>MOVIELAND</h1>

      <div className='search'>
        <input placeholder='Seacrh for Movies' 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" 
        onClick={()=> searchMovies(searchTerm)}
        />
      </div>

      {
        movies.length > 0
        ? (
          <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie}/>
          ))
          }
        </div>
        ):
        (
          <div className='empty'>
            <h2>No movies found!</h2>
          </div>
        )
      }

      

    </div>
  );
}

export default App;
