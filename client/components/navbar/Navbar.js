import React from 'react';
import Reflux from 'reflux';
import UserStore from 'stores/user/store';
import styles from './styles.scss';

export default class Navbar extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [UserStore];
    this.storeKeys = ['user'];
    this.state = {};
  }

  render() {
    return (
      <div className={styles.navbar}>
       NAVBAR
      </div>
    );
  }
}
