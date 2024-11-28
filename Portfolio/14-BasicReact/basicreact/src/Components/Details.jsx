// CharacterDetails.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import CommentsSection from './Comments';
import './Details.css'; // Importar el archivo CSS

function CharacterDetails({ character, comments, onAddComment }) {
  if (!character) return null;

  const affiliationColor = character.affiliation === 'Sith' || character.affiliation === 'Empire' ? 'text-danger' : 'text-primary';

  return (
    <div className="character-details-container">
      <Card className="character-card bg-dark text-white">
        <div className="d-flex flex-column flex-md-row align-items-center">
          <Card.Img
            src={`${process.env.PUBLIC_URL}/${character.image}`}
            alt={`${character.name} Image`}
            className="character-img"
          />
          <Card.Body>
            <Card.Title className="character-name">{character.name}</Card.Title>
            <Card.Subtitle className={`${affiliationColor} mb-3`}>{character.affiliation}</Card.Subtitle>
            <Card.Text>{character.bio}</Card.Text>
          </Card.Body>
        </div>
      </Card>

      {/* Pasamos los comentarios y la función para agregar un nuevo comentario */}
      <CommentsSection comments={comments} onAddComment={onAddComment} />
    </div>
  );
}

export default CharacterDetails;
