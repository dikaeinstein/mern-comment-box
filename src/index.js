import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import CommentBox from './Components/CommentBox';

ReactDOM.render(<CommentBox />, document.getElementById('root'));
registerServiceWorker();
