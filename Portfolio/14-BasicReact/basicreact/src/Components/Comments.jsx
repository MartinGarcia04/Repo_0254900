// CommentsSection.js
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Comments.css'; // Importar el archivo CSS

function CommentsSection({ comments, onAddComment }) {
  const [newComment, setNewComment] = useState({ name: '', comment: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComment = () => {
    if (newComment.name && newComment.comment) {
      onAddComment(newComment);
      setNewComment({ name: '', comment: '' });
    }
  };

  return (
    <div className="comments-section p-4 mt-4 rounded">
      <h5 className="comments-section-title">Comments</h5>

      {/* Mostrar comentarios específicos de la película */}
      <div className="comments-list">
        {comments.map((c, index) => (
          <div key={index} className="comment mb-3">
            <strong>{c.name}</strong>
            <p>{c.comment}</p>
          </div>
        ))}
      </div>

      {/* Formulario para agregar un comentario */}
      <Form className="comment-form">
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={newComment.name}
            onChange={handleInputChange}
            className="comment-input"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formComment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write your comment"
            name="comment"
            value={newComment.comment}
            onChange={handleInputChange}
            className="comment-input"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddComment} className="comment-button">
          Add Comment
        </Button>
      </Form>
    </div>
  );
}

export default CommentsSection;
