import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse, Button } from 'reactstrap';

import { getArticle } from '../../actions/articleAction';

const Article = ({ article: { article, loading }, getArticle, match }) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    async function init(id) {
      await getArticle(id);
    }
    init(match.params.id);
  }, [getArticle, match.params.id]);

  const toggle = () =>
    setState(!state);

  return loading || article === null ? (
    <h1>Loading</h1>
  ) : (
    <div>
      <p>{article.title}</p>
      <Button color="primary" onClick={() => toggle()}>Toggle Comment</Button>
      <Collapse isOpen={state}>
        <p>Comment Field</p>
      </Collapse>
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
  getArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  article: state.article
});

export default connect(
  mapStateToProps,
  { getArticle }
)(Article);
