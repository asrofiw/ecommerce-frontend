/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { 
  Container, Row, Col,
  Pagination, PaginationItem, PaginationLink
 } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
      isLoading, dataNewest, isError, alertMsg, pageInfoNewest
    } = this.props.items;
    console.log(this.props)
    return (
      <>
        <Container>
          <div className="mb-4">
            <h2 className="font-weight-bold">{this.props.title}</h2>
            <span className="text-muted">You&apos;ve never seen before!</span>
          </div>
          <Row className="mb-3">
            {!isLoading && !isError && dataNewest.length !== 0 && dataNewest.map((item) => (
              <Col md={3} xs={6}>
                <Link className="text-decoration-none" to={`/item/${item.sub_category}/${item.id}`}>
                  <CardItem
                    name={item.name}
                    price={item.price}
                    sub_category={item.sub_category}
                  />
                </Link>
              </Col>
            ))}
            {isLoading && !isError && (
              <div>Loading</div>
            )}
            {isError && alertMsg !== '' && (
              <div>{alertMsg}</div>
            )}
          </Row>
          <Pagination aria-label="Page navigation example">
            <PaginationItem>
                <PaginationLink first href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink previous href={pageInfoNewest.prevLink} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="/?page=1">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="/?page=2">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
                  4
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
                  5
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href={pageInfoNewest.nextLink} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink last href="#" />
              </PaginationItem>
            </Pagination>
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
