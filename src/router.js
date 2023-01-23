import Note from "./components/note.vue";
import About from "./components/about.vue";
import Profile from "./components/user_profile.vue";
import Signin from "./components/signin.vue";
import Signup from "./components/signup.vue";
export default [
  {
    path: "/",
    component: Signin,
    name: "signin"
  },
  {
    path: "/signup",
    component: Signup,
    name: "signup"
  },
  {
    path: "/notes",
    component: Note,
    name: "notes"
  },
  {
    path: "/about",
    component: About,
    name: "about"
  },
  {
    path: "/profile",
    component: Profile,
    name: "profile"
  },
];
