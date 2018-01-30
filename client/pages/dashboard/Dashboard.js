import React from 'react';
import Reflux from 'reflux';
import UserStore from 'stores/user/store';
// import UserActions from 'stores/user/actions';
import styles from './styles.scss';

export default class Dashboard extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [UserStore];
    this.storeKeys = ['user'];
    this.state = {};
  }

  render() {
    return (
      <div className={styles.dashboardContainer}>
        DASHBOARD
      </div>
    );
  }
}
