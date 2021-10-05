import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Header from './components/header/header';

import Home from './pages/home/home';
import Account from './pages/account/account';
import Shop from './pages/shop/shop';
import { auth, createUserProfileDocument } from './firebase/firebase.util';
import { setCurrentUser } from './redux/user/user.actions';

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;

    // Handles Google Signin and setting user details
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const userRef = await createUserProfileDocument(userAuth);

      if(userAuth) {
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth)
    });

  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); 
  }

  render() {
    return (
      <div>    
        <BrowserRouter>
        <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" render={() => this.props.currentUser ? (<Redirect to='/' />) : (<Account />)} />
            <Route path="/shop" component={Shop}/>
          </Switch>
        </BrowserRouter>
        
      </div>
    );
  }

}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
