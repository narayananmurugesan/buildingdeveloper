import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';
import { configureStore } from '../src/store';
import { Provider } from 'react-redux'
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const store = configureStore()

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Core Pages


const ProjectItem = React.lazy(() => import('./views/ProjectItem/ProjectItem'));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <HashRouter>
          <React.Suspense fallback={loading()}>
          <ReactNotifications />
            <Switch>
              <Route exact path="/item" name="Landing Page" render={props => <ProjectItem {...props}/>} />
              <Route path="/" name="item" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
      </Provider>
    );
  }
}


export default App;
