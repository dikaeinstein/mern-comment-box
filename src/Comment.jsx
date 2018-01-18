import React, { Component } from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';
import CommentUpdateForm from './CommentUpdateForm';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { isUpdating: false };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
  }

  rawMarkup() {
    const markup = marked(this.props.children.toString());
    return { __html: markup };
  }

  handleCancel() {
    if (this.state.isUpdating) {
      this.setState({ isUpdating: false });
    }
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.onCommentDelete(this.props.uniqueId);
  }

  handleUpdate() {
    this.setState({ isUpdating: true });
  }

  handleUpdateSubmit(comment) {
    const id = this.props.uniqueId;
    this.props.onCommentUpdate(id, comment);
    this.setState({ isUpdating: false });
  }

  render() {
    return (
      <div className="comment">
        <h3>{this.props.author}</h3>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <span>
          <button
            className="updateLink"
            name="update"
            disabled={this.state.isUpdating}
            onClick={this.handleUpdate}
          >
            Update
          </button>
        </span>
        <span>
          <button
            className="updateLink"
            name="cancel"
            onClick={this.handleCancel}
          >
            Cancel
          </button>
        </span>
        <span>
          <button
            className="deleteLink"
            name="delete"
            disabled={this.state.isUpdating}
            onClick={this.handleDelete}
          >
            Delete
          </button>
        </span>
        <CommentUpdateForm hidden={!this.state.isUpdating} onSubmit={this.handleUpdateSubmit} />
      </div>
    );
  }
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  uniqueId: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  onCommentUpdate: PropTypes.func.isRequired,
};

export default Comment;
