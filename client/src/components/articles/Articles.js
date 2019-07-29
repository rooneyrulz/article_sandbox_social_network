import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ArticleForm from './ArticleForm';
import ArticleItem from './ArticleItem';

import { getArticles } from '../../actions/articleAction';

const Articles = ({
  auth: { isAuthenticated },
  arts: { articles },
  getArticles
}) => {
  useEffect(() => {
    async function init() {
      await getArticles();
    }
    init();
  }, [getArticles]);

  return (
    <div id="Articles">
      {isAuthenticated && <ArticleForm />}
      {articles.length > 0 &&
        articles.map(art => <ArticleItem key={art._id} article={art} />)}
    </div>
  );
};

Articles.propTypes = {
  arts: PropTypes.object,
  auth: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  arts: state.article,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getArticles }
)(Articles);
