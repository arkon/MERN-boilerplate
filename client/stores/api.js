/* global BUILD_CONFIG */

const api = {
  user: {
    loadMyUser: BUILD_CONFIG.SMASH ? 'http://localhost/api/v1/user' : 'http://localhost:3000/user',
    getAllUsers: BUILD_CONFIG.SMASH ? 'http://localhost/api/v1/users' : 'http://localhost:3000/users',
    addUser: BUILD_CONFIG.SMASH ? 'http://localhost/api/v1/users' : 'http://localhost:3000/users',
    updateUser: BUILD_CONFIG.SMASH ? 'http://localhost/api/v1/users' : 'http://localhost:3000/users',
  },
};

export default api;
