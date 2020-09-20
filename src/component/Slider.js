import React from 'react';
import { Container,
} from 'reactstrap';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from "react-slick";

// Importing image
// import slide1 from '../assets/images/slide-2.jpg'
// import slide2 from '../assets/images/slide-3.jpg'

class Slide extends React.Component{
  render(){
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500
    };

    return(
      <React.Fragment>
        <Container>
          <div>
            <Slider {...settings}>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <h3>6</h3>
              </div>
            </Slider>
          </div>
        </Container>
      </React.Fragment>
    )
  }
}

export default Slide;