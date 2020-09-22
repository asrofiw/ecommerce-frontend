/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Card, CardBody, CardImg, CardText, CardTitle,
} from 'reactstrap';

// import Image
import product from '../assets/images/product.jpg';
import rating from '../assets/images/star-activated.svg';

const CardItem = (props) => (
  <Card className="mt-3 border">
    <CardImg className="img mb-1" top src={product} alt={props.name} />
    <CardBody>
      <CardTitle className="title font-weight-bold mb-4">{props.name}</CardTitle>
      <CardText className="price font-weight-bold mb-1">
        Rp
        {props.price}
      </CardText>
      <CardText className="sub-category text-muted mb-1">{props.sub_category}</CardText>
      <CardText>
        <img src={rating} alt="rating" />
        <img src={rating} alt="rating" />
        <img src={rating} alt="rating" />
        <img src={rating} alt="rating" />
        <img className="mr-1" src={rating} alt="rating" />
        <span className="txt-2 text-muted">(10)</span>
      </CardText>
    </CardBody>
  </Card>
);

export default CardItem;
