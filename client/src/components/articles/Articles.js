import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse, Button } from 'reactstrap';

import ArticleForm from './ArticleForm';
import ArticleItem from './ArticleItem';
import Spinner from '../layouts/Spinner';

import { getArticles } from '../../actions/articleAction';

const Articles = ({
  auth: { isAuthenticated },
  arts: { articles, loading },
  getArticles,
  history
}) => {
  const [state, setState] = useState(false);

  const toggle = () => setState(!state);

  useEffect(() => {
    async function init() {
      await getArticles();
    }
    init();
  }, [getArticles]);

  return loading || articles.length < 0 ? (
    <Spinner />
  ) : (
    <div id="Articles">
      <div className="Article-Form">
        {isAuthenticated && (
          <Fragment>
            <Button
              className="article-form-toggler btn-lg"
              color="info"
              onClick={() => toggle()}
            >
              Toggle Add Article
            </Button>
            <Collapse className="article-form-collapse" isOpen={state}>
              <ArticleForm toggle={toggle} />
            </Collapse>
          </Fragment>
        )}
      </div>
      <div className="Article-Items">
        {articles.length > 0 &&
          articles.map(art => <ArticleItem history={history} key={art._id} article={art} />)}
      </div>
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
