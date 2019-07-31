import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  Button
} from 'reactstrap';

import {
  likeArticle,
  unLikeArticle,
  deleteArticle
} from '../../actions/articleAction';

const ArticleItem = ({
  article: { _id, name, title, user, likes, comments, date },
  auth,
  likeArticle,
  unLikeArticle,
  deleteArticle,
  history
}) => {
  const goToArticleItem = () => history.push(`/article/${_id}`);

  const onHandleDelete = () => deleteArticle(_id);

  return (
    <Card style={{ position: 'relative' }} className="Article-Item my-5">
      <CardHeader>
        <h1 className="display-4">{title}</h1>
      </CardHeader>
      <CardBody>
        <CardText className="pt-3">
          <Button
            color="primary"
            className="like"
            onClick={() => likeArticle(_id)}
          >
            <i className="fas fa-thumbs-up"></i>{' '}
            {likes.length > 0 && (
              <span className="like-count">{likes.length}</span>
            )}
          </Button>
          <Button
            color="secondary"
            className="like"
            onClick={() => unLikeArticle(_id)}
          >
            <i className="fas fa-thumbs-down"></i>
          </Button>
        </CardText>
      </CardBody>
      <CardFooter>
        {auth.isAuthenticated && auth.user._id === user && (
          <Button
            color="danger"
            className="delete border-0 btn mr-3"
            onClick={() => onHandleDelete()}
          >
            <i className="fas fa-times"></i>
          </Button>
        )}
        <Button
          color="dark"
          className="explore btn"
          onClick={() => goToArticleItem()}
        >
          Explore{' '}
          <span className="comment-count">
            {comments.length > 0 && <span>{comments.length}</span>}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

ArticleItem.propTypes = {
  article: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  likeArticle: PropTypes.func,
  unlikeArticle: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { likeArticle, unLikeArticle, deleteArticle }
)(ArticleItem);
