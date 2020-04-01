import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Coverpage from "../views/CoverPage.vue";
import Users from "../views/Users.vue";
import Signin from "../views/Signin.vue";
import Signup from "../views/Signup.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Coverpage",
    component: Coverpage,
    meta: {
      authRequired: false
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      authRequired: true
    }
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      authRequired: true
    }
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    meta: {
      authRequired: false
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      authRequired: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(route => route.meta.authRequired);
  if (!authRequired) return next();

  if (store.getters["auth/loggedIn"]) {
    return store.dispatch("auth/validate").then(validUser => {
      validUser ? next() : redirectToLogin();
    });
  }

  redirectToLogin();

  function redirectToLogin() {
    router.push("signin");
  }
});

export default router;
