import Header from './components/Header/Header';
import RegistrationForm from './components/Register/RegistrationForm';
import BaseHome from './components/Home/BaseHome';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import ProductList from './components/Product/ProductList';
import Cart from './components/Cart/Cart';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route exact path="/">
              <BaseHome />
            </Route>
            <Route path="/register">
              <RegistrationForm />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/profile">
            <Profile />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
          </Switch>
       </div>
   </div>
  </Router>
  );
}

export default App;
