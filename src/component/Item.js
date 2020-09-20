import React from 'react'
import {Container, Row, Col,
  Card, CardImg, CardBody, CardTitle, CardText
} from 'reactstrap'
import {default as axios} from 'axios'

// import Image
import product from '../assets/images/product.jpg'
import rating from '../assets/images/star-activated.svg'

class Item extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }

  async componentDidMount(){
    await this.getDataUpdated()
  }

  getDataUpdated = async () => {
    const {data} = await axios.get('http://localhost:8080/items')
    this.setState({data: data.dataResult})
  }


  render(){
    const {data} = this.state
    return(
      <React.Fragment>
        <Container>
          <div className="mb-4">
            <h2 className="font-weight-bold">Popular</h2>
            <span className="text-muted">Find clothes that are trending recently</span>
          </div>
          <Row>
            {Object.keys(data).length && data.map(item => {
              return(
                <Col md={3} xs={6}>
                  <Card className="mt-3 border">
                    <CardImg className="img mb-1" top src={product} alt={item.name} />
                    <CardBody>
                      <CardTitle className="title font-weight-bold mb-4">{item.name}</CardTitle>
                      <CardText className="price font-weight-bold mb-1">Rp {item.price}</CardText>
                      <CardText className="sub-category text-muted mb-1">{item.sub_category}</CardText>
                      <CardText>
                        <img src={rating} alt="rating" />
                        <img src={rating} alt="rating" />
                        <img src={rating} alt="rating" />
                        <img src={rating} alt="rating" />
                        <img class="mr-1" src={rating} alt="rating" />
                        <span class="txt-2 text-muted">(10)</span>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default Item;