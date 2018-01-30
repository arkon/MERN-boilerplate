import 'mdi/css/materialdesignicons.css';
import 'roboto-npm-webfont';
import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import { HashRouter, Redirect, Route } from 'react-router-dom';
// Stores
import UserStore from 'stores/user/store';
// Pages
import Dashboard from './pages/dashboard/Dashboard';
// Components
import Loading from './components/loading/Loading';
import Navbar from './components/navbar/Navbar';
import './polyfills';
import styles from './styles.scss';

class App extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.stores = [UserStore];
    this.storeKeys = ['user'];
  }

  componentDidMount() {

  }

  render() {
    return (
      <HashRouter>
        <div className={styles.container}>
          <Route exact path="**" component={Navbar} />
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/loading" component={Loading} />
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
