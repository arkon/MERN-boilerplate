import Reflux from 'reflux';

const UserActions = Reflux.createActions(
  [
    'loadMyUser',
    'getAllUsers',
    'getUserById',
    'addUser',
    'updateUser',
    'deleteUser',
    'updateSearchValue',
    'reset',
  ],
);
export default UserActions;
