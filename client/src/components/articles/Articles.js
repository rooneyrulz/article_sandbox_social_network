import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ArticleForm from './ArticleForm';
import ArticleItem from './ArticleItem';

import { getArticles } from '../../actions/articleAction';

const Articles = ({ articles: { articles }, getArticles }) => {
  useEffect(() => getArticles(), [getArticles]);

  return (
    <div id="Articles">
      <ArticleForm />
      {articles.map(art => (
        <ArticleItem key={art._id} article={art} />
      ))}
    </div>
  );
};

Articles.propTypes = {
  articles: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.article
});

export default connect(
  mapStateToProps,
  { getArticles }
)(Articles);
