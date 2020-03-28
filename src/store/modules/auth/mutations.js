const SET_CURRENT_USER = (state, value) => {
  state.currentUser = value;
  saveState("auth.currentUser", value);
};

export default {
  SET_CURRENT_USER
};

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}
