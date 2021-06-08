import React from "react";
import ReactDOM from 'react-dom';

import NewEmployee from '../components/employee/newEmployee';
import List from '../components/employee/list';
import EditEmployee from '../components/employee/edit';
import Nav from "./employee/Nav";
import 'antd/dist/antd.css';

import {BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const Main = () => {
    return (
        <Router>
            <main>
                <Nav/>
                <Switch>
                    <Route path="/employee/index" exact component={List} />
                    <Route path="/employee/form" component={NewEmployee} />
                    <Route path="/employee/edit/:id" component={EditEmployee} />
                    <Route path="/employee/details/:id" component={EditEmployee} />
                </Switch>
            </main>
        </Router>
    )
}

export default Main;
ReactDOM.render(<Main/>, document.getElementById('main-employee'));
