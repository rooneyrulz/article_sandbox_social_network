import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const ArticleForm = () => {
  const [formData, setFormData] = useState({ name: '', description: '' });

  const onHandleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onHandleSubmit = e => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div id="Article-Form">
      <Form onSubmit={e => onHandleSubmit(e)}>
        <FormGroup>
          <Label htmlFor="name">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Enter title"
            onChange={e => onHandleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            placeholder="Enter description"
            onChange={e => onHandleChange(e)}
          />
        </FormGroup>
        <Button type="submit" color="success">
          CREATE
        </Button>
      </Form>
    </div>
  );
};

export default ArticleForm;
