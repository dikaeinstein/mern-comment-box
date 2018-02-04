import React, { Component } from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import '../index.css';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.url = 'http://169.254.221.27:4000/api/comments';
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.getServerComments = this.getServerComments.bind(this);
    this.pollInterval = 3000;
  }

  componentDidMount() {
    this.getServerComments();
    this.intervalID = setInterval(this.getServerComments, this.pollInterval);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.data !== this.state.data;
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getServerComments() {
    axios.get(this.url)
      .then((res) => {
        this.setState({ data: res.data.comments || [] });
      })
      .catch(err => console.log(err));
  }

  handleCommentDelete(id) {
    axios.delete(`${this.url}/${id}`)
      .then(() => console.log('comment deleted.'))
      .catch(err => console.error(err));
  }

  handleCommentUpdate(id, comment) {
    axios.put(`${this.url}/${id}`, comment)
      .catch(err => console.error(err));
  }

  handleSubmit(comment) {
    const id = Date.now();
    const payLoad = { id, ...comment };
    axios.post(this.url, payLoad)
      .then((res) => {
        const data = this.state.data.slice();
        data.push(res.data.comment);
        this.setState({ data });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="commentBox">
        <h2 className="title">Comments:</h2>
        <CommentList
          data={this.state.data}
          onCommentUpdate={this.handleCommentUpdate}
          onCommentDelete={this.handleCommentDelete}
        />
        <CommentForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default CommentBox;
