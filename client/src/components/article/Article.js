import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse, Button, Row, Col } from 'reactstrap';
import Moment from 'react-moment';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Spinner from '../layouts/Spinner';

import { getArticle } from '../../actions/articleAction';

const Article = ({
  article: { article, loading },
  auth: { isAuthenticated },
  getArticle,
  match,
  history
}) => {
  const [state, setState] = useState({
    isAddComment: false,
    isViewComment: false
  });

  useEffect(() => {
    async function init(id) {
      await getArticle(id);
    }
    init(match.params.id);
  }, [getArticle, match.params.id]);

  const toggleAddComment = () =>
    setState({ ...state, isAddComment: !state.isAddComment });

  const toggleViewComment = () =>
    setState({ ...state, isViewComment: !state.isViewComment });

  return loading || article === null ? (
    <Spinner />
  ) : (
    <div id="Article">
      <div className="article">
        <Row>
          <Col sm="12" md="8">
            <h1 className="display-4 mb-5">{article.title}</h1>
            <p className="lead mb-5">{article.description}</p>
            <Moment format="DD/MM/YYYY">{article.date}</Moment>
          </Col>
          <Col sm="12" md="4">
            <div className="article-comment mt-5">
              {isAuthenticated ? (
                <Fragment>
                  {article.comments.length > 0 && (
                    <Button
                      className="comment-form-toggler btn-lg m-4"
                      color="dark"
                      onClick={() => toggleAddComment()}
                    >
                      Toggle Comment
                    </Button>
                  )}
                  <Collapse
                    className="comment-collapse"
                    isOpen={state.isAddComment}
                  >
                    <div className="Comment-Form m-4">
                      <CommentForm history={history} articleId={article._id} />
                    </div>
                    <div className="Comment-Items">
                      {article.comments.length > 0 &&
                        article.comments.map(comment => (
                          <CommentItem
                            key={comment._id}
                            commentId={comment._id}
                            articleId={article._id}
                            comment={comment}
                            artLoading={loading}
                          />
                        ))}
                    </div>
                  </Collapse>
                </Fragment>
              ) : (
                <Fragment>
                  {article.comments.length > 0 && (
                    <Button
                      className="comment-form-toggler btn-lg m-4"
                      color="primary"
                      onClick={() => toggleViewComment()}
                    >
                      View Comment
                    </Button>
                  )}
                  <Collapse
                    className="comment-collapse"
                    isOpen={state.isViewComment}
                  >
                    <div className="Comment-Items">
                      {article.comments.length > 0 &&
                        article.comments.map(comment => (
                          <CommentItem
                            key={comment._id}
                            commentId={comment._id}
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
          </Col>
        </Row>
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
