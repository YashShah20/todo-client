import AllNotes from "./components/notes/allNotes.vue";
import CreateNote from "./components/notes/createNote.vue";
import SingleNote from "./components/notes/singleNote.vue";

import Login from "./components/user/login.vue";
import Signup from "./components/user/signup.vue";

import About from "./components/about.vue";

export default [
  {
    path: "/",
    component: Login
  },
  {
    path: "/signup",
    component: Signup
  },
  {
    path: "/notes/add",
    component: CreateNote
  },
  {
    path: "/notes",
    component: AllNotes
  },
  {
    path: "/notes/:id",
    component: SingleNote
  },
  {
    path: "/about",
    component: About
  }
];
