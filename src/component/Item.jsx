/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

// import Action
import itemsAction from '../redux/actions/items';

// Importing Component
import CardItem from './CardItem';

class Item extends React.Component {
  async componentDidMount() {
    this.props.getItems();
  }

  render() {
    const {
      isLoading, data, isError, alertMsg,
    } = this.props.items;
    return (
      <>
        <Container>
          <div className="mb-4">
            <h2 className="font-weight-bold">Popular</h2>
            <span className="text-muted">Find clothes that are trending recently</span>
          </div>
          <Row>
            {!isLoading && !isError && data.length !== 0 && data.map((item) => (
              <Col md={3} xs={6}>
                <CardItem
                  name={item.name}
                  price={item.price}
                  sub_category={item.sub_category}
                />
              </Col>
            ))}
            {isLoading && !isError && (
              <div>Loading</div>
            )}
            {isError && alertMsg !== '' && (
              <div>{alertMsg}</div>
            )}
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.items,
});

const mapDispatchToProps = {
  getItems: itemsAction.getData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
