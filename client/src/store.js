import {createStore} from 'vuex'
  
import persistedstate from 'vuex-persistedstate';

const store = createStore({
  state() {
    return {
      user: {}
    }
  },
  mutations: {
    user(state, data) {
      state.user = data;
    }
  },
  plugins: [
    // keep the user when the page is refreshed
    persistedstate({
      paths: ['user']
    })
  ]
});

export default store;