import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Moment from 'react-moment';

import { deleteComment } from '../../actions/articleAction';

const CommentItem = ({
  comment: { _id, name, text, user, date },
  auth,
  articleId,
  artLoading,
  deleteComment
}) => {
  return artLoading ? <h1>Loading</h1> : (
    <div className="Comment-Item">
      <p>{name}</p>
      <p>{text}</p>
      <p>
        <Moment format='DD/MM/YYYY'>{date}</Moment>
      </p>
      {!auth.loading && auth.user._id === user && (
        <Button color="danger" onClick={() => deleteComment(articleId, _id)}>
          Remove
        </Button>
      )}
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  articleId: PropTypes.string,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
