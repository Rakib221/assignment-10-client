import { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Admin from './Components/Admin/Admin';
import Checkout from './Components/Checkout/Checkout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import ManageBooks from './Components/ManageBooks/ManageBooks';
import Nav from './Components/Nav/Nav';
import NotFound from './Components/NotFound/NotFound';
import Orders from './Components/Orders/Orders';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
export const UserContext = createContext();
function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [user, setUser] = useState({});
    return (
        <div className='App h-full '>
            <UserContext.Provider
                value={[loggedInUser, setLoggedInUser, user, setUser]}
            >
                <Router>
                    <div>
                        <Nav></Nav>

                        {/* <hr /> */}

                        <Switch>
                            <Route exact path='/'>
                                <Home />
                            </Route>
                            <PrivateRoute path='/admin'>
                                <Admin />
                            </PrivateRoute>
                            <PrivateRoute path='/order'>
                                <Orders />
                            </PrivateRoute>
                            <Route path='/login'>
                                <Login></Login>
                            </Route>
                            <PrivateRoute path='/book/:bookId'>
                                <Checkout></Checkout>
                            </PrivateRoute>
                            <Route path='*'>
                                <NotFound></NotFound>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </UserContext.Provider>
        </div>
    );
}

export default App;
