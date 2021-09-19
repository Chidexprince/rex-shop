import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/header/header';

import Home from './pages/home/home';
import Account from './pages/account/account';
import Shop from './pages/shop/shop';

function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Account}/>
          <Route path="/shop" component={Shop}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
