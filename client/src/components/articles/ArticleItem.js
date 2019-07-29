import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardHeader, CardTitle, CardFooter } from 'reactstrap';

import { likeArticle, unLikeArticle } from '../../actions/articleAction';

const ArticleItem = ({ article, likeArticle, unLikeArticle }) => {
  const [state, setState] = useState({ isOpen: false });

  const toggle = () => setState({ ...state, isOpen: !state.isOpen });

  return (
    <Card style={{ position: 'relative' }} className="Article-Item mb-3">
      <CardHeader>
        <span
          style={{
            position: 'absolute',
            top: '1px',
            right: '5px',
            cursor: 'pointer'
          }}
          className="btn"
          onClick={() => toggle()}
        >
          {'>'}
        </span>
        <CardTitle>{article.title}</CardTitle>
      </CardHeader>
      <CardFooter>
        <a onClick={() => likeArticle(article._id)} href="#!">
          Like
        </a>
        <a onClick={() => unLikeArticle(article._id)} href="#!">
          Unlike
        </a>
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
