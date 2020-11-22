import { firebaseAuth } from '@/plugins/firebase.js'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    loggedIn: false
  },
  getters: {
    loggedIn: state => state.loggedIn,
  },
  mutations: {
    setLoggedIn(state, payload) {
      state.loggedIn = payload
    }
  },
  actions: {
    register(ctx, payload) {
      return firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
    },
    login(ctx, payload) {
      return firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
    },
    logoutUser() {
      firebaseAuth.signOut()
    },
    handleAuthStateChange({ commit, dispatch }) {
      var promise = new Promise(function (resolve, reject) {
        firebaseAuth.onAuthStateChanged(user => {
          if (user) {
            commit('setLoggedIn', true)
            localStorage.loggedIn = JSON.stringify(true)
            router.push('/')
            dispatch('stocks/fbReadData', null, { root: true })
            dispatch('fbReadData', null, { root: true })
            resolve()
          }
          else {
            localStorage.loggedIn = JSON.stringify(false)
            commit('setLoggedIn', false)
            commit('stocks/stocksDownloaded', false)
            router.replace('/auth')
            reject()
          }
        })
      });
      return promise
      // return firebaseAuth.onAuthStateChanged(user => {
      //   console.log("começou 2");
      //   console.log(user.uid, 'uid aqui')
      //   if (user) {
      //     commit('setLoggedIn', true)
      //     localStorage.loggedIn = JSON.stringify(true)
      //     router.push('/')
      //     dispatch('stocks/fbReadData', null, { root: true })
      //     dispatch('fbReadData', null, { root: true })
      //   }
      //   else {
      //     localStorage.loggedIn = JSON.stringify(false)
      //     commit('setLoggedIn', false)
      //     commit('stocks/stocksDownloaded', false)
      //     router.replace('/auth')
      //   }
      // })
    }
  }
}