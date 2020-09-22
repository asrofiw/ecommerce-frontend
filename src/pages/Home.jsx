/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/no-unused-state */
import React from 'react';
import {} from 'reactstrap';

// import Component
import NavBar from '../component/NavBar';
import ItemUpdated from '../component/ItemUpdated';
import Item from '../component/Item';
import Slider from '../component/Slider';
import Category from '../component/Category';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: '',
      price: '',
      description: '',
      categoryID: '3',
      subCategoryID: '4',
    };
  }

  render() {
    return (
      <>
        <NavBar />
        <Slider />
        <div className="mb-5">
          <Category />
        </div>
        <div className="mb-5">
          <ItemUpdated />
        </div>
        <div className="mb-5">
          <Item />
        </div>
      </>
    );
  }
}

export default Home;