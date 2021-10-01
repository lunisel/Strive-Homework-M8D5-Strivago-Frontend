import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter, Route, RouteComponentProps} from "react-router-dom"
import SignIn from "./components/sign-in/SignIn"
import LogIn from "./components/log-in/LogIn"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
           <Route exact path="/sign-in" component={(routerProps:RouteComponentProps) => <SignIn {...routerProps}/>}/>
           <Route exact path="/log-in" component={(routerProps:RouteComponentProps) => <LogIn {...routerProps}/>}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
