/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/no-unused-state */
import React from 'react';

// import Component
import NavBar from '../component/NavBar';
import ItemUpdated from '../component/ItemUpdated';
import Item from '../component/Item';
import Slider from '../component/Slider';
import Category from '../component/Category';

class Home extends React.Component{
  render() {
    console.log(this.props)
    return (
      <>
        <NavBar />
        <Slider />
        <div className="mb-5">
          <Category />
        </div>
        <div className="mb-5">
          <ItemUpdated title="New" />
        </div>
        <div className="mb-5">
          <Item />
        </div>
      </>
    )
  }
};

export default Home;
