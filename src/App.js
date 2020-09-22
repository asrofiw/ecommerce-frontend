import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom'

// Importing pages
import ItemProduct from './pages/ItemProduct'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddItem from './pages/AddItem'

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/admin" component={ItemProduct}  />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/add-item" component={AddItem} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
