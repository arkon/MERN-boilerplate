import Reflux from 'reflux';
// import uuid from 'uuid/v4';
import UserActions from './actions';

export default class UserStore extends Reflux.Store {
  constructor() {
    super();
    this.listenToMany(UserActions);
    this.state = {
      user: null,
    };
    this.stores = [];
    this.storeKeys = [];
  }

  reset = () => {
    this.setState({
      user: null,
    });
  }

  loadMyUser() {
    console.log('hola!');
  }

}
