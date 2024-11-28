import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Card.css'; // Importar el archivo CSS

function MovieCard({ movie, onToggle, isExpanded }) {
  const [hover, setHover] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  // Define el color del borde según la afiliación del personaje
  const borderColor = movie.best_character.affiliation === 'Sith' || movie.best_character.affiliation === 'Empire'
    ? 'red'
    : 'blue';

  return (
    <Card
      className={`movie-card ${hover ? 'movie-card-hover' : ''}`}
      style={{ borderColor }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
     <Card.Img
        variant="top"
        className="movie-card-img"
        src={hover ? `${process.env.PUBLIC_URL}/${movie.best_character.affiliation}.png` : `${process.env.PUBLIC_URL}/${movie.poster}`}
        alt={`${movie.title} Poster`}
        />

      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="movie-card-title">{movie.title}</Card.Title>
          <Card.Subtitle className="movie-card-subtitle">{movie.year}</Card.Subtitle>
        </div>
        <div>
          <Button variant="primary" onClick={onToggle}>
            {isExpanded ? 'Less' : 'More'}
          </Button>
          <div className="mt-2 movie-card-buttons">
            <Button variant="outline-success" onClick={() => setLikes(likes + 1)}>👍 {likes}</Button>
            <Button variant="outline-danger" onClick={() => setDislikes(dislikes + 1)} className="ms-2">👎 {dislikes}</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;


