/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-default */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

// Import Action
import itemsAction from '../redux/actions/items';

// Importing Component
import CardItem from './CardItem';

class ItemUpdated extends React.Component {
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
            <h2 className="font-weight-bold">New</h2>
            <span className="text-muted">You&apos;ve never seen before!</span>
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
  getItems: itemsAction.getDataNewest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemUpdated);
