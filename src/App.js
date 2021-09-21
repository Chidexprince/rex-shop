import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/header/header';

import Home from './pages/home/home';
import Account from './pages/account/account';
import Shop from './pages/shop/shop';
import { auth } from './firebase/firebase.util';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({
        currentUser: user
      })

    })

  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); 
  }

  render() {
    return (
      <div>    
        <BrowserRouter>
        <Header currentUser={this.state.currentUser} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Account}/>
            <Route path="/shop" component={Shop}/>
          </Switch>
        </BrowserRouter>
        
      </div>
    );
  }

}

export default App;
