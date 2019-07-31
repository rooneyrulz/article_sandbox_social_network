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

import { likeArticle, unLikeArticle } from '../../actions/articleAction';

const ArticleItem = ({
  article: { _id, name, title, user, likes, comments, date },
  likeArticle,
  unLikeArticle,
  history
}) => {
  const goToArticleItem = () => history.push(`/article/${_id}`);

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
        <Button color="dark" className="explore btn" onClick={() => goToArticleItem()}>
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
  likeArticle: PropTypes.func,
  unlikeArticle: PropTypes.func
};

export default connect(
  null,
  { likeArticle, unLikeArticle }
)(ArticleItem);
