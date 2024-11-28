import React, { useState } from 'react';
import './App.css';
import MovieCard from './Components/Card';
import CharacterDetails from './Components/Details';
import sw from './data/data.js';

function App() {
  const [expandedMovie, setExpandedMovie] = useState(null); // Almacena la película expandida
  const [comments, setComments] = useState({});

  const addComment = (episode, newComment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [episode]: [...(prevComments[episode] || []), newComment],
    }));
  };

  const handleToggle = (movie) => {
    setExpandedMovie((prev) => (prev?.episode === movie.episode ? null : movie));
  };

  // Agrupar las películas en filas de 2 elementos
  const rows = [];
  for (let i = 0; i < sw.length; i += 2) {  // Cambié el 3 por 2 para tener 2 cards por fila
    rows.push(sw.slice(i, i + 2));
  }

  return (
    <div className="container">
      {rows.map((row, rowIndex) => (
        <div className="row g-4 justify-content-center" key={rowIndex}> {/* Agregado justify-content-center para centrar las cards */}
          {row.map((movie) => (
            <React.Fragment key={movie.episode}>
              <div className="col-12 col-md-6 col-lg-6 d-flex justify-content-center"> {/* Cambié col-lg-4 a col-lg-6 */}
                <MovieCard
                  movie={movie}
                  onToggle={() => handleToggle(movie)}
                  isExpanded={expandedMovie?.episode === movie.episode}
                />
              </div>

              {expandedMovie?.episode === movie.episode && (
                <div className="col-12">
                  <CharacterDetails
                    character={expandedMovie.best_character}
                    comments={comments[expandedMovie.episode] || []}
                    onAddComment={(newComment) =>
                      addComment(expandedMovie.episode, newComment)
                    }
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
