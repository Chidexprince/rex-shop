import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/header/header';

import Home from './pages/home/home';
import Account from './pages/account/account';
import Shop from './pages/shop/shop';
import { auth, createUserProfileDocument } from './firebase/firebase.util';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {

    // Handles Google Signin and setting user details
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const userRef = await createUserProfileDocument(userAuth);

      if(userAuth) {
        userRef.onSnapshot(snapShot => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            }
          )
        })
      }

      this.setState({ currentUser: userAuth})
    });

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
