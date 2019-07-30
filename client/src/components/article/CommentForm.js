import React, { useState } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Button } from 'reactstrap';

import { addComment } from '../../actions/articleAction';

const CommentForm = ({ articleId, addComment }) => {
  const [text, setText] = useState({ text: '' });
  
  const onHandleChange = e =>
    setText({ ...text, [e.target.name]: e.target.value });

  const onHandleSubmit = e => {
    e.preventDefault();
    console.log(text);
    addComment(text, articleId);
  };

  return (
    <Form inline onSubmit={e => onHandleSubmit(e)}>
      <FormGroup>
        <Input
          type="text"
          name="text"
          id="comment"
          placeholder="Type comment"
          onChange={e => onHandleChange(e)}
        />
      </FormGroup>
      <Button type="submit" color="primary">
        Comment
      </Button>
    </Form>
  );
};

CommentForm.propTypes = {
  articleId: PropType.string,
  addComment: PropType.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
