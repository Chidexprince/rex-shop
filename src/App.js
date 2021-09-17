import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/header/header';

import Home from './pages/home/home';
import Shop from './pages/shop/shop';

function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
