import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Container, Navbar, Nav } from 'react-bootstrap'
import Home from "./Home";
import Items from "./Items";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../common.css';

const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/items', name: 'Items', Component: Items }
]

class Body extends Component {
  render() {
    return (
      <Router>
      <>
        <Navbar bg="light">
          <Nav className="mx-auto">
            {routes.map(route => (
              <Nav.Link
                key={route.path}
                as={NavLink}
                to={route.path}
                activeClassName="active"
                exact
              >
                {route.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar>
        <Container className="container">
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </Container>
      </>
    </Router>
    );
  }
}

export default Body;