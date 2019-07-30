import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, CardHeader, CardTitle, CardText } from 'reactstrap';

import { likeArticle, unLikeArticle } from '../../actions/articleAction';

const ArticleItem = ({ article, likeArticle, unLikeArticle }) => {
  return (
    <Card style={{ position: 'relative' }} className="Article-Item mb-3">
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
      </CardHeader>
      <CardText>
        <a onClick={() => likeArticle(article._id)} href="#!">
          Like
        </a>
        <a onClick={() => unLikeArticle(article._id)} href="#!">
          Unlike
        </a>
      </CardText>
      <Link to={`/article/${article._id}`}>Explore</Link>
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
