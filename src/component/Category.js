import React from 'react'
import Carousel from 'react-elastic-carousel'
import { Container } from 'reactstrap'

import jacket from '../assets/images/jacket.png'
import tshirt from '../assets/images/t-shirt.png'
import pants from '../assets/images/pants.png'
import shoes from '../assets/images/shoes.png'
import shorts from '../assets/images/shorts.png'

class Slider extends React.Component{

  render(){

    const breakpoints = [
      {width: 1, itemsToShow: 1},
      {width: 360, itemsToShow: 2},
      {width: 720, itemsToShow: 3},
      {width: 1200, itemsToShow: 4},
    ]

    return(
      <React.Fragment>
        <Container>
          <div className="mb-4">
            <h2 className="font-weight-bold">Category</h2>
            <span className="text-muted">You've never seen before!</span>
          </div>
          <Carousel className="category" breakPoints={breakpoints}>
            <div className="category-item bg-color">
              <img src={jacket} alt="jacket"></img>
              <span className="position-absolute h3 font-weight-bold">Jacket</span>
            </div>
            <div className="category-item bg-success">
              <img src={tshirt} alt="t-shirt"></img>
              <span className="position-absolute h3 font-weight-bold">T-Shirt</span>
            </div>
            <div className="category-item bg-danger">
            <img src={pants} alt="pants"></img>
              <span className="position-absolute h3 font-weight-bold">Pants</span>
            </div>
            <div className="category-item bg-warning">
            <img src={shoes} alt="shoes"></img>
              <span className="position-absolute h3 font-weight-bold">Shoes</span>
            </div>
            <div className="category-item bg-info">
            <img src={shorts} alt="shorts"></img>
              <span className="position-absolute h3 font-weight-bold">Shorts</span>
            </div>
          </Carousel>
        </Container>
      </React.Fragment>
    )
  }
}

export default Slider