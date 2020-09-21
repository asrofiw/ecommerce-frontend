import React from 'react'
import Carousel from 'react-elastic-carousel'
import { Container } from 'reactstrap'

import slide1 from '../assets/images/slide-2.jpg'
import slide2 from '../assets/images/slide-3.jpg'

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
          <Carousel className="carousel" breakPoints={breakpoints}>
            <div className="car-item">
              <img className="car-item position-relative" src={slide1} alt="Slide"></img>
              <span className="position-absolute font-weight-bold">Trends 2020</span>
            </div>
            <div className="car-item">
              <img className="car-item position-relative" src={slide2} alt="Slide"></img>
              <span className="position-absolute font-weight-bold">Black Edition</span>
            </div>
            <div className="car-item">
              <img className="car-item position-relative" src={slide1} alt="Slide"></img>
              <span className="position-absolute font-weight-bold">Trends 2020</span>
            </div>
            <div className="car-item">
              <img className="car-item position-relative" src={slide2} alt="Slide"></img>
              <span className="position-absolute font-weight-bold">Black Edition</span>
            </div>
            <div className="car-item">
              <img className="car-item position-relative" src={slide1} alt="Slide"></img>
              <span className="position-absolute font-weight-bold">Trends 2020</span>
            </div>
            <div className="car-item">
              <img className="car-item position-relative" src={slide2} alt="Slide"></img>
              <span className="position-absolute font-weight-bold">Black Edition</span>
            </div>
          </Carousel>
        </Container>
      </React.Fragment>
    )
  }
}

export default Slider