import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = (props) => {
  const commentNodes = props.data.map(comment => (
    <Comment
      author={comment.author}
      uniqueId={comment._id}
      key={comment._id}
      onCommentDelete={props.onCommentDelete}
      onCommentUpdate={props.onCommentUpdate}
    >
      {comment.text}
    </Comment>
  ));

  return (
    <div className="commentList">
      {commentNodes}
    </div>
  );
};

CommentList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  onCommentUpdate: PropTypes.func.isRequired,
};

export default CommentList;
