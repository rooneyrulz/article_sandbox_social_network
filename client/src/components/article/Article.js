import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse, Button } from 'reactstrap';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

import { getArticle } from '../../actions/articleAction';

const Article = ({
  article: { article, loading },
  auth: { isAuthenticated },
  getArticle,
  match
}) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    async function init(id) {
      await getArticle(id);
    }
    init(match.params.id);
  }, [getArticle, match.params.id]);

  const toggle = () => setState(!state);

  return loading || article === null ? (
    <h1>Loading</h1>
  ) : (
    <div id="Article">
      <p>{article.title}</p>
      {isAuthenticated && (
        <Fragment>
          <Button color="primary" onClick={() => toggle()}>
            Toggle Comment
          </Button>
          <Collapse isOpen={state}>
            <div id="Comment-Form">
              <CommentForm articleId={article._id} />
            </div>
            <div id="Comment-Items">
              {article.comments.length > 0 &&
                article.comments.map(comment => (
                  <CommentItem
                    key={comment._id}
                    articleId={article._id}
                    comment={comment}
                    artLoading={loading}
                  />
                ))}
            </div>
          </Collapse>
        </Fragment>
      )}
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  article: state.article,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getArticle }
)(Article);
