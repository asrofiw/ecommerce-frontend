import React from 'react'
import {} from 'reactstrap'

// import Component
import NavBar from '../component/NavBar'
import ItemUpdated from '../component/ItemUpdated'
import Item from '../component/Item'
import Slide from '../component/Slider'

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: [],
      name: '',
      price: '',
      description: '',
      categoryID: '3',
      subCategoryID: '4'
    }
  }

  render(){
    return(
      <React.Fragment>
        <NavBar />
        <Slide />
        <div className="mb-5">
          <ItemUpdated />
        </div>
        <div className="mb-5">
          <Item />
        </div>
      </React.Fragment>
    )
  }
}

export default Home;
