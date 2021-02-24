import React from "react";
import './App.css';
import {HashRouter, Route} from "react-router-dom"
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import Logout from "./components/Logout";

function App() {

    return (
        <HashRouter>
            <div className="App">
                <Route exact path="/" component={Login}/>
                <Route exact path="/dashboard" component={Dashboard}/>
            </div>
        </HashRouter>
    );
}

export default App;
