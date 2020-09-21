import React from 'react'
import qs from 'querystring'
import {default as axios} from 'axios'
import {Container, Button, Row, Col,
  Form, FormGroup, Label, Input,
  Modal, ModalBody, ModalFooter, ModalHeader,
  InputGroup, InputGroupAddon
} from 'reactstrap'

// Importing Component
import NavBar from '../component/NavBar'

class ItemProduct extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: [],
      modalDetail: false,
      modalDelete: false,
      name: '',
      price: '',
      description: '',
      categoryID: '3',
      subCategoryID: '4',
      nextLink: '',
      prevLink: '',
      search: '',
      sortBy: '',
      sort: ''
    }
  }

  async componentDidMount(){
    await this.getData()
  }

  getData = async () => {
    const {data} = await axios.get('http://localhost:8080/items')
    this.setState({data: data.dataResult, nextLink: data.pageInfo.nextLink, prevLink: data.pageInfo.prevLink})
  }

  getDetail = async (id)=>{
    const {data} = await axios.get(`http://localhost:8080/items/${id}`)
    this.setState({modalDetail: true, ...data.data[0]}, ()=>{
      console.log(data)
    })
  }

  nextPage = async () => {
    if (this.state.nextLink !== null) {
      const {data} = await axios.get(this.state.nextLink)
      this.setState({data: data.dataResult, nextLink: data.pageInfo.nextLink, prevLink: data.pageInfo.prevLink})
    } else {
      return(
        <Button disable></Button>
      )
    }
  }

  prevPage = async () => {
    if (this.state.prevLink !== null){
      const {data} = await axios.get(this.state.prevLink)
      this.setState({data: data.dataResult, nextLink: data.pageInfo.nextLink, prevLink: data.pageInfo.prevLink})
    } else {
      return(
        <Button disable></Button>
      )
    }
  }

  formSubmit = async (e)=>{
    e.preventDefault()
    await axios.post(`http://localhost:8080/items`, qs.stringify(
      {name: this.state.name, price: this.state.price, description: this.state.description,
      categoryID: this.state.categoryID, subCategoryID: this.state.subCategoryID}))
    this.setState({
      name: '',
      price: '',
      description: '',
      categoryID: '3',
      subCategoryID: '4'
    }, async()=>{
      await this.getData()
    })
  }

  editItem = async (e)=>{
    e.preventDefault()
    await axios.put(`http://localhost:8080/items/${this.state.id}`, qs.stringify(
      {name: this.state.name, price: this.state.price, description: this.state.description,
      categoryID: this.state.categoryID, subCategoryID: this.state.subCategoryID}))
    this.setState({
      name: '',
      price: '',
      description: '',
      categoryID: '3',
      subCategoryID: '4',
      modalDetail: false,
    }, async()=>{
      await this.getData()
    })
  }

  deleteItem = async ()=>{
    await axios.delete(`http://localhost:8080/items/${this.state.id}`)
    this.setState({
      name: '',
      price: '',
      description: '',
      categoryID: '3',
      subCategoryID: '4',
      modalDetail: false,
      modalDelete: false
    }, async ()=>{
      await this.getData()
    })
  }

  searchItem = async (e) => {
    e.preventDefault()
    const {data} = await axios.get(`http://localhost:8080/items?search=${this.state.search}`)
    this.setState({data: data.dataResult, nextLink: data.pageInfo.nextLink, prevLink: data.pageInfo.prevLink})
  }

  sortItem = async (e) => {
    e.preventDefault()
    const {data} = await axios.get(`http://localhost:8080/items?sort[${this.state.sortBy}]=${this.state.sort}`)
    this.setState({data: data.dataResult, nextLink: data.pageInfo.nextLink, prevLink: data.pageInfo.prevLink})
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  closeToggle = () => {
    this.setState({
      name: '',
      price: '',
      description: '',
      categoryID: '3',
      subCategoryID: '4',
      modalDetail: false
    })
  }

  render(){
    const {data} = this.state
    return(
      <React.Fragment>
        <NavBar />
        <Container>
          <h2 className="font-weight-bold mb-3">List of Items</h2>
          <Row md={2} xs={1} className="mx-3">
            <Col>
              <Form className="mb-3">
              <InputGroup>
                <Input type="search" name="search" onChange={this.changeInput} value={this.state.search} placeholder="Search" />
                <InputGroupAddon addonType="prepend"><Button color="primary" className="bg-color" type="submit" name="submit" onClick={this.searchItem} >Search</Button></InputGroupAddon>
              </InputGroup>  
              </Form>
            </Col>
            <Col>
              <Form className="mb-5">
              <InputGroup>
                <Input type="search" name="sortBy" onChange={this.changeInput} value={this.state.sortBy} placeholder="Sort by" />
                <Input type="search" name="sort" onChange={this.changeInput} value={this.state.sort} placeholder="Sort type" />
                <InputGroupAddon addonType="prepend"><Button color="primary" className="bg-color" type="submit" name="submit" onClick={this.sortItem} >Sort</Button></InputGroupAddon>
              </InputGroup>
              </Form>
            </Col>
          </Row>
          <div>
            <Row md={5} xs={5} className="align-items-center text-center mx-2 mt-5">
              <Col><h5>Name</h5></Col>
              <Col><h5>Category</h5></Col>
              <Col><h5>Sub Category</h5></Col>
              <Col><h5>Price</h5></Col>
              <Col><h5>Action</h5></Col>
            </Row>
            {Object.keys(this.state.data).length && data.map(item => {
              return(
              <Row md={5} xs={5} className="justify-content-center align-items-center m-2">
                <Col className="text-left">{item.name}</Col>
                <Col className="text-center">{item.category}</Col>
                <Col className="text-center">{item.sub_category}</Col>
                <Col className="text-right">{item.price}</Col>
                <Col className="align-items-center justify-content-center text-center">
                  <Button color="primary" className="text-center bg-color" onClick={()=>this.getDetail(item.id)}>Detail</Button>
                </Col>
              </Row>
              )
            })}
            <Row md={4} className="container justify-content-between mx-0 my-4">
              <Button color="primary" className="text-center px-0 bg-color" onClick={this.prevPage} block>&laquo; Prev</Button>
              <Button color="primary" className="text-center m-0 px-0 bg-color" onClick={this.nextPage} block>Next &raquo;</Button>
            </Row>
          </div>

          <Modal isOpen={this.state.modalDetail}>
            <Form>
              <ModalHeader toggle={this.closeToggle}>
                <span><h3>Detail</h3>{this.state.name}</span>
              </ModalHeader>
              <ModalBody>
                <Input name='name' className='mb-2' onChange={this.changeInput} value={this.state.name} />
                <Input name='price' className='mb-2' onChange={this.changeInput} value={this.state.price} />
                <Input type='textarea' className='mb-2' name='description' rows='3' onChange={this.changeInput} value={this.state.description} />
                <Input type="select" className='mb-2' name="categoryID" onChange={this.changeInput} value={this.state.categoryID} id="categoryID">
                  <option value="3">Fashion Pria</option>
                  <option value="2">Fashion Wanita</option>
                </Input>
                <Input type="select" className='mb-2' name="subCategoryID" onChange={this.changeInput} value={this.state.subCategoryID} id="subCategoryID">
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
              </ModalBody>
              <ModalFooter>
                <Button color="primary" className="bg-color" onClick={this.editItem}>Edit</Button>
                <Button color="primary" className="bg-color" onClick={()=>this.setState({modalDelete: true})}>Delete</Button>
              </ModalFooter>
            </Form>
          </Modal>

          <Modal isOpen={this.state.modalDelete}>
            <ModalBody>
              Are you sure want to delete {this.state.name} ?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" className="bg-color" onClick={this.deleteItem}>Yes</Button>
              <Button color="primary" className="bg-color" onClick={()=>this.setState({modalDelete: false})}>No</Button>
            </ModalFooter>
          </Modal>
          
          <Form onSubmit={this.formSubmit} className="my-5 shadow p-5">
            <h3>Add Item</h3>
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
            <Button color="primary" className="bg-color">Submit</Button>&nbsp;
            <Button color="primary" className="bg-color" onClick={()=>this.setState({
              name: '',
              price: '',
              description: '',
              categoryID: '3',
              subCategoryID: '4',
            })}>Clear</Button>
          </Form>
        </Container>
      </React.Fragment>
    )
  }
}

export default ItemProduct
