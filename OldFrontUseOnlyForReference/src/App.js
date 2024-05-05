import React, { useEffect, useState } from "react";
import { Login } from "./auth/Login.js";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from "./pages/Home/Home.js";
import Task2SA2 from "./components/Task2SA2.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated"));
  }, [isAuthenticated]);

  return (
    <Router>
        <Switch>
            {isAuthenticated && <Route path="/products" render={() => <Home  setIsAuthenticated={setIsAuthenticated} /> } />}
            <Route path='/' exact render={() => isAuthenticated? <Redirect to='/products' /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
            {isAuthenticated && <Redirect to='/products' />}
            <Redirect to='/' />
            <Route path="/test" render={() => <Task2SA2></Task2SA2>}/>
        </Switch>
    </Router>
  )
}

export default App;