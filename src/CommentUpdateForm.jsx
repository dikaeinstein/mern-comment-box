import React from 'react';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';

const CommentUpdateForm = props => (
  !props.hidden ?
    <CommentForm onSubmit={props.onSubmit} /> : null
);

CommentUpdateForm.propTypes = {
  hidden: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CommentUpdateForm;
