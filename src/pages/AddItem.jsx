/* eslint-disable linebreak-style */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
import React from 'react';
import {
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: '',
      price: '',
      description: '',
      categoryID: '3',
      subCategoryID: '4',
    };
  }

  formSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}items`, qs.stringify(
      {
        name: this.state.name,
        price: this.state.price,
        description: this.state.description,
        categoryID: this.state.categoryID,
        subCategoryID: this.state.subCategoryID,
      },
    ));
    this.setState({
      name: '',
      price: '',
      description: '',
      categoryID: '3',
      subCategoryID: '4',
    });
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <React.Fragment className="bg-secondary">
        <Form onSubmit={this.formSubmit} className="m-5 shadow p-5">
          <h3 className="mb-5">Add Item</h3>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" onChange={this.changeInput} value={this.state.name} placeholder="Name" />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input type="number" name="price" id="price" onChange={this.changeInput} value={this.state.price} placeholder="Price" />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" name="description" rows="5" onChange={this.changeInput} value={this.state.description} id="description" />
          </FormGroup>
          <FormGroup>
            <Label for="selectCategory">Category</Label>
            <Input type="select" name="categoryID" onChange={this.changeInput} value={this.state.categoryID} id="selectCategory">
              <option value="3">Fashion Pria</option>
              <option value="2">Fashion Wanita</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="selectSubCategory">Sub Category</Label>
            <Input type="select" name="subCategoryID" onChange={this.changeInput} value={this.state.subCategoryID} id="selectSubCategory">
              <option value="4">Atasan Pria</option>
              <option value="5">Bawahan Pria</option>
              <option value="6">Outwear Pria</option>
              <option value="13">Batik Pria</option>
              <option value="8">Atasan Wanita</option>
              <option value="9">Bawahan Wanita</option>
              <option value="10">Outwear Wanita</option>
              <option value="11">Dress</option>
              <option value="7">Batik Wanita</option>
            </Input>
          </FormGroup>
          <Button color="primary" className="bg-color">Submit</Button> &nbsp;
          <Button
            color="primary"
            className="bg-color"
            onClick={() => this.setState({
              name: '',
              price: '',
              description: '',
              categoryID: '3',
              subCategoryID: '4',
            })}
          >
            Clear
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default AddItem;
