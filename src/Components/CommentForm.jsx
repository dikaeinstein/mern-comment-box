import React from 'react';
import PropTypes from 'prop-types';

const CommentForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const { author, text } = e.target;
    const authorName = author.value.trim();
    const textContent = text.value.trim();
    if (!authorName || !textContent) {
      return;
    }

    props.onSubmit({ author: authorName, text: textContent });
    author.value = '';
    text.value = '';
  };

  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="author"
        placeholder="Your name…"
        className="commentFormAuthor"
      />
      <input
        type="text"
        name="text"
        placeholder="Say something…"
        className="commentFormText"
      />
      <button
        type="submit"
        className="commentFormPost"
        value="Post"
      >
        Post
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentForm;
