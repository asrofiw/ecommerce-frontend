import React from 'react'
import {Container, Row, Col
} from 'reactstrap'
import {default as axios} from 'axios'

// Importing Component
import CardItem from './CardItem'

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
                  <CardItem
                    name={item.name}
                    price={item.price}
                    sub_category={item.sub_category}
                  >
                  </CardItem>
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