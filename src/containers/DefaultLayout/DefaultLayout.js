import React, { Component, Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import * as router from 'react-router-dom';

// routes config
import routes from '../../routes';

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  constructor(props){
    super(props);
    this.state={
        data_username:'Username'
    }
  }


  render() {
    return (
      <div className="app">
        <div className="app-body">
          <main className="main mt-xs-4">
            <Container fluid className="pt-2">
              <Suspense fallback={this.loading()}>
                <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (

                      <Route
                        key={idx}

                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props }
                          />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/item" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
