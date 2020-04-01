import { auth } from "./state";

const init = ({ dispatch }) => {
  dispatch("validate");
};

const validate = ({ commit, state }) => {
  if (!state.currentUser) return Promise.resolve(null);
  const user = auth.currentUser();
  commit("SET_CURRENT_USER", user);
  return user;
};

const attemptLogin = ({ commit, dispatch }, credentials) => {
  return new Promise((resolve, reject) => {
    dispatch("attemptConfirmation", credentials).then(() => {
      auth
        .login(credentials.email, credentials.password, true)
        .then(response => {
          resolve(response);
          commit("SET_CURRENT_USER", response);
        })
        .catch(error => {
          reject(error.json);
        });
    });
  });
};

const attemptConfirmation = ({ dispatch }, credentials) => {
  return new Promise((resolve, reject) => {
    if (!credentials.token) {
      resolve();
      return;
    }
    auth
      .confirm(credentials.token)
      .then(response => {
        credentials.token = null;
        dispatch("attemptLogin", credentials);
        resolve(response);
      })
      .catch(error => {
        reject(error);
        // alert(error);
      });
  });
};

const attemptSignUp = ({ commit }, credentials) => {
  return new Promise((resolve, reject) => {
    auth
      .signup(credentials.email, credentials.password, {
        full_name: credentials.username
      })
      .then(response => {
        commit("TOGGLE_LOAD");
        resolve(response);
      })
      .catch(error => {
        reject(error);
        // alert("It's an error", error);
      });
  });
};

const attemptLogout = ({ commit }) => {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser();
    user
      .logout()
      .then(response => {
        resolve(response);
        commit("SET_CURRENT_USER", null);
      })
      .catch(error => {
        reject(error);
        // alert("Could not log out", error);
      });
  });
};

export default {
  init,
  validate,
  attemptSignUp,
  attemptConfirmation,
  attemptLogin,
  attemptLogout
};
