import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse, Button } from 'reactstrap';
import Moment from 'react-moment';

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
      <div className="article">
        <h1 className="display-4 mb-5">{article.title}</h1>
        <p className="lead mb-5">{article.description}</p>
        <Moment format="DD/MM/YYYY">{article.date}</Moment>
        <div className="article-comment mt-5">
          {isAuthenticated && (
            <Fragment>
              <Button
                className="comment-form-toggler btn-lg"
                color="dark"
                onClick={() => toggle()}
              >
                Toggle Comment
              </Button>
              <Collapse className="comment-collapse" isOpen={state}>
                <div className="Comment-Form">
                  <CommentForm articleId={article._id} />
                </div>
                <div className="Comment-Items">
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
      </div>
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
